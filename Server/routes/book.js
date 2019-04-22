const express = require("express");
const authCheck = require("../config/auth-check");
const Book = require("../models/Book");
const path = require("path");
const multer = require("multer");

// configuring Multer to use files directory for storing files
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./files");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage }).single("file");

const router = new express.Router();

function validateBookCreateForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = "";

  payload.price = parseFloat(payload.price);

  if (
    !payload ||
    typeof payload.title !== "string" ||
    payload.title.length < 3
  ) {
    isFormValid = false;
    errors.title = "Book name must be at least 3 symbols.";
  }

  if (
    !payload ||
    typeof payload.description !== "string" ||
    payload.description.length < 10 ||
    payload.description.length > 200
  ) {
    isFormValid = false;
    errors.description =
      "Description must be at least 10 symbols and less than 120 symbols.";
  }

  if (!payload || !payload.price || payload.price < 0) {
    isFormValid = false;
    errors.price = "Price must be a positive number.";
  }

  if (
    !payload ||
    typeof payload.image !== "string" ||
    !(
      payload.image.startsWith("https://") ||
      payload.image.startsWith("http://")
    ) ||
    payload.image.length < 14
  ) {
    isFormValid = false;
    errors.image =
      "Please enter valid Image URL. Image URL must be at least 14 symbols.";
  }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

router.post("/create", authCheck, (req, res) => {
  const bookObj = req.body;
  if (req.user.roles.indexOf("Admin") > -1) {
    const validationResult = validateBookCreateForm(bookObj);
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      });
    }

    Book.create(bookObj)
      .then(createdBook => {
        res.status(200).json({
          success: true,
          message: "Book added successfully.",
          data: createdBook
        });
      })
      .catch(err => {
        console.log(err);
        let message = "Something went wrong :( Check the form for errors.";
        if (err.code === 11000) {
          message = "Book with the given name already exists.";
        }
        return res.status(200).json({
          success: false,
          message: message
        });
      });
  } else {
    return res.status(200).json({
      success: false,
      message: "Invalid credentials!"
    });
  }
});

router.post("/edit/:id", authCheck, (req, res) => {
  if (req.user.roles.indexOf("Admin") > -1) {
    const bookId = req.params.id;
    const bookObj = req.body;
    const validationResult = validateBookCreateForm(bookObj);
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      });
    }

    Book.findById(bookId)
      .then(existingBook => {
        existingBook.title = bookObj.title;
        existingBook.author = bookObj.author;
        existingBook.genres = bookObj.genres;
        existingBook.description = bookObj.description;
        existingBook.price = bookObj.price;
        existingBook.image = bookObj.image;
        existingBook.reviews = bookObj.reviews; // updated

        existingBook
          .save()
          .then(editedBook => {
            res.status(200).json({
              success: true,
              message: "Book edited successfully.",
              data: editedBook
            });
          })
          .catch(err => {
            console.log(err);
            let message = "Something went wrong :( Check the form for errors.";
            if (err.code === 11000) {
              message = "Book with the given name already exists.";
            }
            return res.status(200).json({
              success: false,
              message: message
            });
          });
      })
      .catch(err => {
        console.log(err);
        const message = "Something went wrong :( Check the form for errors.";
        return res.status(200).json({
          success: false,
          message: message
        });
      });
  } else {
    return res.status(200).json({
      success: false,
      message: "Invalid credentials!"
    });
  }
});

router.get("/all", (req, res) => {
  Book.find().then(books => {
    res.status(200).json(books);
  });
});

router.post("/review/:id", authCheck, (req, res) => {
  const id = req.params.id;
  const review = req.body.review;
  const username = req.user.username;
  const userId = req.user.id;

  if (review.length < 4) {
    const message = "Review must be at least 4 characters long.";
    return res.status(200).json({
      success: false,
      message: message
    });
  }

  Book.findById(id)
    .then(book => {
      if (!book) {
        return res.status(200).json({
          success: false,
          message: "Book not found."
        });
      }

      let reviewObj = {
        review,
        createdBy: username,
        authorId: userId
      };

      let reviews = book.reviews;
      reviews.push(reviewObj);
      book.reviews = reviews;
      book
        .save()
        .then(book => {
          res.status(200).json({
            success: true,
            message: "Review added successfully.",
            data: book
          });
        })
        .catch(err => {
          console.log(err);
          const message = "Something went wrong :( Check the form for errors.";
          return res.status(200).json({
            success: false,
            message: message
          });
        });
    })
    .catch(err => {
      console.log(err);
      const message = "Something went wrong :( Check the form for errors.";
      return res.status(200).json({
        success: false,
        message: message
      });
    });
});

router.post("/review/delete/:id/:reviewIndex", authCheck, (req, res) => {
  console.log(req.params);

  const id = req.params.id; // bookId
  const reviewIndex = req.params.reviewIndex;
  const user = req.user;
  const username = user.username;

  Book.findById(id)
    .then(book => {
      // Find book
      if (!book) {
        return res.status(200).json({
          success: false,
          message: "Book not found."
        });
      }

      // Find review
      let reviews = book.reviews.slice();
      console.log(reviews);

      if (reviewIndex < 0 || reviewIndex >= reviews.length) {
        return res.status(200).json({
          success: false,
          message: "Review not found."
        });
      }

      // Admin or Review Author
      let reviewToDelete = reviews[reviewIndex];
      console.log(reviewToDelete);

      const isAdmin = user.roles.indexOf("Admin") > -1;
      const isAuthor = reviewToDelete.createdBy === username;

      if (!isAdmin && !isAuthor) {
        return res.status(200).json({
          success: false,
          message: "Invalid credentials."
        });
      }

      // Remove review
      reviews.splice(reviewIndex, 1);
      console.log(reviews);

      // Save book with updated reviews
      book.reviews = reviews;
      book
        .save()
        .then(book => {
          res.status(200).json({
            success: true,
            message: "Review deleted successfully.",
            data: book
          });
        })
        .catch(err => {
          console.log(err);
          const message = "Something went wrong :( Check the form for errors.";
          return res.status(200).json({
            success: false,
            message: message
          });
        });
    })
    .catch(err => {
      console.log(err);
      const message = "Something went wrong :( Check the form for errors.";
      return res.status(200).json({
        success: false,
        message: message
      });
    });
});

router.post("/like/:id", authCheck, (req, res) => {
  const id = req.params.id;
  const username = req.user.username;
  Book.findById(id)
    .then(book => {
      if (!book) {
        const message = "Product not found.";
        return res.status(200).json({
          success: false,
          message: message
        });
      }

      let likes = book.likes;
      if (!likes.includes(username)) {
        likes.push(username);
      }
      book.likes = likes;
      book
        .save()
        .then(book => {
          res.status(200).json({
            success: true,
            message: "Book liked successfully.",
            data: book
          });
        })
        .catch(err => {
          console.log(err);
          const message = "Something went wrong :(";
          return res.status(200).json({
            success: false,
            message: message
          });
        });
    })
    .catch(err => {
      console.log(err);
      const message = "Something went wrong :(";
      return res.status(200).json({
        success: false,
        message: message
      });
    });
});

router.post("/unlike/:id", authCheck, (req, res) => {
  const id = req.params.id;
  const username = req.user.username;
  Book.findById(id)
    .then(book => {
      if (!book) {
        let message = "Product not found.";
        return res.status(200).json({
          success: false,
          message: message
        });
      }

      let likes = book.likes;
      if (likes.includes(username)) {
        const index = likes.indexOf(username);
        likes.splice(index, 1);
      }

      book.likes = likes;
      book
        .save()
        .then(book => {
          res.status(200).json({
            success: true,
            message: "Product unliked successfully.",
            data: book
          });
        })
        .catch(err => {
          console.log(err);
          const message = "Something went wrong :(";
          return res.status(200).json({
            success: false,
            message: message
          });
        });
    })
    .catch(err => {
      console.log(err);
      const message = "Something went wrong :(";
      return res.status(200).json({
        success: false,
        message: message
      });
    });
});

router.delete("/delete/:id", authCheck, (req, res) => {
  const id = req.params.id;
  if (req.user.roles.indexOf("Admin") > -1) {
    Book.findById(id)
      .then(book => {
        book.remove().then(() => {
          return res.status(200).json({
            success: true,
            message: "Book deleted successfully!"
          });
        });
      })
      .catch(() => {
        return res.status(200).json({
          success: false,
          message: "Entry does not exist!"
        });
      });
  } else {
    return res.status(200).json({
      success: false,
      message: "Invalid credentials!"
    });
  }
});

router.post("/upload/:id", authCheck, (req, res) => {
  const id = req.params.id;

  if (req.user.roles.indexOf("Admin") > -1) {
    upload(req, res, function(err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }

      const file = req.file; // file passed from client
      console.log(file);

      Book.findById(id).then(existingBook => {
        if (!existingBook) {
          return res.status(200).json({
            success: false,
            message: "Book not found."
          });
        }

        // const absPath = path.join(__dirname, "../", file.path);
        // console.log(absPath);
        // existingBook.file = absPath;

        existingBook.file = file.path; // relative path

        existingBook
          .save()
          .then(editedBook => {
            res.status(200).json({
              success: true,
              message: "File uploaded successfully.",
              data: editedBook
            });
          })
          .catch(err => {
            console.log(err);
            let message = "Something went wrong :( Check the form for errors.";
            if (err.code === 11000) {
              message = "Book with the given name already exists.";
            }
            return res.status(200).json({
              success: false,
              message: message
            });
          });
      });
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "Invalid credentials!"
    });
  }
});

router.post("/upload/delete/:id", authCheck, (req, res) => {
  const id = req.params.id;

  if (req.user.roles.indexOf("Admin") > -1) {
    upload(req, res, function(err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }

      Book.findById(id).then(existingBook => {
        if (!existingBook) {
          return res.status(200).json({
            success: false,
            message: "Book not found."
          });
        }

        existingBook.file = "";

        existingBook
          .save()
          .then(editedBook => {
            res.status(200).json({
              success: true,
              message: "File deleted successfully.",
              data: editedBook
            });
          })
          .catch(err => {
            console.log(err);
            let message = "Something went wrong :(";
            if (err.code === 11000) {
              message = "Book with the given name already exists.";
            }
            return res.status(200).json({
              success: false,
              message: message
            });
          });
      });
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "Invalid credentials!"
    });
  }
});

router.get("/download/:id", authCheck, (req, res) => {
  const id = req.params.id;

  Book.findById(id)
    .then(existingBook => {
      if (!existingBook) {
        return res.status(200).json({
          success: false,
          message: "Book not found."
        });
      }

      const file = existingBook.file;
      console.log(file);

      if (!file || file === undefined || file === "") {
        return res.status(200).json({
          success: false,
          message: "Book file not found."
        });
      }

      // Download file
      return res.download(file);
    })
    .catch(err => {
      console.log(err);
      const message = "Something went wrong :(";
      return res.status(200).json({
        success: false,
        message: message
      });
    });
});

module.exports = router;

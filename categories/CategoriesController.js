const express = require("express");
const { default: slugify } = require("slugify");
const Category = require("./Category");
const router = express.Router();

router.get("/admin/categories/new", (req, res) => {
  res.render("admin/categories/new");
});

router.post("/categories/save", (req, res) => {
  let title = req.body.title;

  if (title) {
    Category.create({
      title: title,
      slug: slugify(title, { lower: true }),
    })
      .then(() => {
        res.redirect("/admin/categories");
      })
      .catch((error) => {
        console.log("Erro ao cadastrar nova categoria", error);
      });
  } else {
    res.redirect("/admin/categories/new");
  }
});

router.get("/admin/categories", (req, res) => {
  Category.findAll({}).then((categories) => {
    res.render("admin/categories/index", { categories: categories });
  });
});

router.post("/categories/delete", (req, res) => {
  let id = req.body.id;
  if (id != null) {
    if (!isNaN(id)) {
      Category.destroy({
        where: {
          id: id,
        },
      }).then(() => {
        res.redirect("/admin/categories");
      });
    } else {
      res.redirect("/admin/categories");
    }
  } else {
    res.redirect("/admin/categories");
  }
});

module.exports = router;

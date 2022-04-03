const express = require("express");
const res = require("express/lib/response");
const { redirect } = require("express/lib/response");
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

router.get("/admin/categories/edit/:id", (req, res) => {
  let id = req.params.id;

  if (isNaN(id)) {
    res.redirect("/admin/categories");
    return;
  }

  Category.findByPk(id)
    .then((category) => {
      console.log(category);
      if (category != undefined) {
        res.render("admin/categories/edit", { category: category });
      } else {
        res.redirect("/admin/categories");
      }
    })
    .catch((error) => {
      res.redirect("/admin/categories");
    });
});

router.post("/categories/update", (req, res) => {
  let id = req.body.id;
  let title = req.body.title;

  Category.update(
    { title: title, slug: slugify(title, { lower: true }) },
    {
      where: {
        id: id,
      },
    }
  ).then(() => {
    res.redirect("/admin/categories");
  });
});

module.exports = router;

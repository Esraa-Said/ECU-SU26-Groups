const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "products.json");

const server = http.createServer((req, res) => {
  const pathname = req.url;
  const method = req.method;

  res.setHeader("Content-Type", "application/json");

  // ===========================
  // GET ALL PRODUCTS
  // ===========================
  if (method === "GET" && pathname === "/products") {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end(JSON.stringify({ message: "Error reading file" }));
      }

      res.writeHead(200);
      res.end(data);
    });
  }

  // ===========================
  // ADD PRODUCT
  // ===========================
  else if (method === "POST" && pathname === "/products") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      let newProduct;

      try {
        newProduct = JSON.parse(body);
      } catch {
        res.writeHead(400);
        return res.end(JSON.stringify({ message: "Invalid JSON" }));
      }

      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          res.writeHead(500);
          return res.end(JSON.stringify({ message: "Error reading file" }));
        }

        const products = JSON.parse(data);

        let maxId = 0;

        if (products.length > 0) {
          maxId = Math.max(...products.map((p) => p.id));
        }

        newProduct.id = maxId + 1;

        products.push(newProduct);

        fs.writeFile(filePath, JSON.stringify(products, null, 2), (err) => {
          if (err) {
            res.writeHead(500);
            return res.end(JSON.stringify({ message: "Error saving file" }));
          }

          res.writeHead(201);
          res.end(JSON.stringify(newProduct));
        });
      });
    });
  }

  // ===========================
  // DELETE PRODUCT
  // ===========================
  else if (method === "DELETE" && pathname.startsWith("/products/")) {
    const id = Number(pathname.split("/")[2]);

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end(JSON.stringify({ message: "Error reading file" }));
      }

      const products = JSON.parse(data);

      const updatedProducts = products.filter((product) => product.id !== id);

      if (updatedProducts.length === products.length) {
        res.writeHead(404);
        return res.end(JSON.stringify({ message: "Product not found" }));
      }

      fs.writeFile(
        filePath,
        JSON.stringify(updatedProducts, null, 2),
        (err) => {
          if (err) {
            res.writeHead(500);
            return res.end(JSON.stringify({ message: "Error saving file" }));
          }

          res.writeHead(200);
          res.end(
            JSON.stringify({
              message: "Product deleted successfully",
            }),
          );
        },
      );
    });
  }

  // ===========================
  // NOT FOUND
  // ===========================
  else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
});

server.listen(3000, () => {
  console.log("Server Running on http://localhost:3000");
});

// Import necessary modules
const http = require('http');
const url = require('url');

// Create a server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === '/') {
    // Display the Quadratic Equation form
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Quadratic Equation Solver</h1>');
    res.write('<form action="/calculate" method="get">');
    res.write('<label for="a">Enter value of a:</label>');
    res.write('<input type="text" name="a" required><br><br>');
    res.write('<label for="b">Enter value of b:</label>');
    res.write('<input type="text" name="b" required><br><br>');
    res.write('<label for="c">Enter value of c:</label>');
    res.write('<input type="text" name="c" required><br><br>');
    res.write('<input type="submit" value="Solve">');
    res.write('</form>');
    res.end();
  } 
  else if (pathname === '/calculate') {
    const queryParams = parsedUrl.query;
    const a = parseFloat(queryParams.a);
    const b = parseFloat(queryParams.b);
    const c = parseFloat(queryParams.c);

    const discriminant = b * b - 4 * a * c;

    res.writeHead(200, { 'Content-Type': 'text/html' });

    if (discriminant > 0) {
      const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      res.write(`<h1>Roots are Real and Different</h1>`);
      res.write(`<p>Root 1: ${root1}</p>`);
      res.write(`<p>Root 2: ${root2}</p>`);
    } 
    else if (discriminant === 0) {
      const root = -b / (2 * a);
      res.write(`<h1>Roots are Real and Equal</h1>`);
      res.write(`<p>Root: ${root}</p>`);
    } 
    else {
      res.write(`<h1>Roots are Imaginary (Complex)</h1>`);
    }

    res.end();
  } 
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('<h1>404 Not Found</h1>');
    res.end();
  }
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
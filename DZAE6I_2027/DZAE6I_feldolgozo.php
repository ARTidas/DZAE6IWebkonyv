<!doctype html>
<html lang="en-US">
<head>
    <title>Exercise</title>

    <meta charset="UTF-8" />
    <meta http-equiv="content-type" content="text/html" />
    <meta name="description" content="Exercise" />
    <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="pragma" content="no-cache" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="index.css" type="text/css" />
</head>
<body>

    <section class="container">
        <h1>Results - DZAE6I</h1>
        <p>
            <a href="DZAE6I_urlap.html">Back</a>
        </p>

        <?php
            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                $name       = $_POST['name'];
                $pin        = $_POST['pin'];
                $fruit      = $_POST['fruit'];
                $age        = $_POST['age'];
                $shoeSize   = $_POST['shoeSize'];
                $confidence = $_POST['confidence'];

                if (empty($name)) {
                    echo "<span class=\"warning\">Name cannot by empty!</span><br>";
                }
                if (empty($pin)) {
                    echo "<span class=\"warning\">Pin cannot by empty!</span><br>";
                }
                if (empty($fruit)) {
                    echo "<span class=\"warning\">Fruit cannot by empty!</span><br>";
                }
                if (empty($age)) {
                    echo "<span class=\"warning\">Age cannot by empty!</span><br>";
                }
                if (empty($shoeSize)) {
                    echo "<span class=\"warning\">Shoe size cannot by empty!</span><br>";
                }
                if (empty($confidence)) {
                    echo "<span class=\"warning\">Confidence cannot by empty!</span><br>";
                }

                echo "Name: $name<br>";
                echo "Favorite Fruit: $fruit<br>";
                echo "Age: $age<br>";
                echo "Shoe Size: $shoeSize<br>";
                echo "Confidence: $confidence<br>";
            }
        ?>
        <footer>
            <p>Zoltan Veres - DZAE6I</p>
        </footer>
    </section>

</body>
</html>
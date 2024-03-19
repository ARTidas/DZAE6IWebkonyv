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

    <header>
        <h1>Form - DZAE6I</h1>
    </header>

    <section class="container">
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
                    echo "<span class=\"warning\">Name is empty!</span><br>";
                }
                else {
                    if (strlen($name) > 50) {
                        echo "<span class=\"warning\">Name cannot be longer than 50 characters!</span><br>";
                    }
                }
                if (empty($pin)) {
                    echo "<span class=\"warning\">Pin is empty!</span><br>";
                }
                else {
                    if (strlen($pin) > 50) {
                        echo "<span class=\"warning\">Pin cannot by longer than 50 characters!</span><br>";
                    }
                }
                if (empty($fruit)) {
                    echo "<span class=\"warning\">Fruit is empty!</span><br>";
                }
                if (empty($age)) {
                    echo "<span class=\"warning\">Age is empty!</span><br>";
                }
                if (empty($shoeSize)) {
                    echo "<span class=\"warning\">Shoe size is empty!</span><br>";
                }
                if (empty($confidence)) {
                    echo "<span class=\"warning\">Confidence is empty!</span><br>";
                }

                echo("<br/>");

                echo "Name: $name<br>";
                echo "Favorite Fruit: $fruit<br>";
                echo "Age: $age<br>";
                echo "Shoe Size: $shoeSize<br>";
                echo "Confidence: $confidence<br>";
            }
        ?>
    </section>

    <br/>
    <hr/>

    <footer>
        <p>Zoltan Veres - DZAE6I</p>
        
        <p>W3Schools HTML5: <a target="_blank" href="https://www.w3schools.com/html/">https://www.w3schools.com/html/</a></p>
        <p>W3Schools Form: <a target="_blank" href="https://www.w3schools.com/html/html_forms.asp">https://www.w3schools.com/html/html_forms.asp</a></p>
        <p>HTML5: <a target="_blank" href="https://html5.org/">https://html5.org/</a></p>
    </footer>

</body>
</html>
<?php
    $host = "localhost";
    $user = "X33958764";
    $pwd = "X33958764";
    $dbname = "X33958764";

    $conn = mysqli_connect($host, $user, $pwd, $dbname);

    //Check connection
    if (mysqli_connect_errno()) {
            echo "Failed to connect to database."
                    . mysqli_connect_error()
                    . "<br> Error number: "
                    . mysqli_connect_errno();
    }
    else
    {
        echo("Connection is guuuuuud!");
    }
?>
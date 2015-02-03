<?php
    //Login details
    $username = "nonuser"; 
    $password = "liverpool9";   
    $host = "localhost";
    $database="locations";
    
    //Connect to the server
    //$server = mysql_connect($host, $username, $password);
    //$connection = mysql_select_db($database, $server);

    $connection = mysqli_connect($host, $username, $password, $database);

    //Set up the query and run it
    $myquery = " SELECT  `imgurl`, `lat`, `long` FROM  `pins` ";
    $query = mysqli_query($connection, $myquery);
    
    //Check the query worked
    if ( ! $query ) {
        echo mysql_error();
        die;
    }
    
    //Set up data as an array
    $data = array();
 
    //Print out the start of our new array
    echo "[";
    
    //Loop through the array
    for ($i = 0; $i < mysqli_num_rows($query); $i++) {
        $data[] = mysqli_fetch_assoc($query);                        //Put the rows into the data array
        echo                                                         //Echo each row, seperating lat and long with a comma, enclosed in square brackets
        "[",
        $data[$i]['imgurl'],
        ",",
        $data[$i]['lat'],
        ",",
         $data[$i]['long'],
        "]";       
        if ($i <= (mysqli_num_rows($query)-2) ) {                    //Ensure comma is not inserted after the last pin
            echo ",";
        }
    }
    
        echo "];";                                                  //Close the array

 //   echo json_encode($data);     
     
    mysqli_close($connection);                                           //Close the connection
?>

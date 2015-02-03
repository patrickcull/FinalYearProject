<?php
	//Login details
    $username = "nonuser"; 
    $password = "password";   
    $host = "localhost";
    $database="locations";
    
    //Connect to the server
    $server = mysql_connect($host, $username, $password);
    $connection = mysql_select_db($database, $server);

    //Set up the query and run it
    $myquery = " SELECT  `lat`, `long` FROM  `pins` ";
    $query = mysql_query($myquery);
    
    //Check the query worked
    if ( ! $query ) {
        echo mysql_error();
        die;
    }
    
    //Set up data as an array
    $data = array();
 
 	//Print out the start of our new array
	echo "var planelatlong = [";
    
    //Loop through the array
    for ($i = 0; $i < mysql_num_rows($query); $i++) {
        $data[] = mysql_fetch_assoc($query);						//Put the rows into the data array
        echo "[",$data[$i]['lat'],",",$data[$i]['long'],"]";		//Echo each row, seperating lat and long with a comma, enclosed in square brackers
        if ($i <= (mysql_num_rows($query)-2) ) {					//Ensure comma is not inserted after the last pin
			echo ",";
		}
    }
    
    	echo "];";													//Close the array

 //   echo json_encode($data);     
     
    mysql_close($server);											//Close the connection
?>

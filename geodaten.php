<?php

$con=pg_connect("dbname=gis") or print("cant connect");



$query = ' select id, gno2_mk, ST_AsText(geom)  from ist2014f where gno2_mk >40 ;';


$result = pg_query($con, $query);
       if (!$result)  {
                header("HTTP/1.0 500 Internal Server Error on query: ");
		         die("Internal Server Error query:". $query );

    }
        $rtn= pg_fetch_all($result);
	


print  "data=".json_encode($rtn).";";

pg_close($con);

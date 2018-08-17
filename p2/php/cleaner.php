<?php
header('Access-Control-Allow-Origin: *'); 
function connect(){
//	error_log("connecting db");
	return new PDO("mysql:host=mysql51-132.bdb;dbname=gosimplemod2", "gosimplemod2", "mMfqF8Suh3KG");
}

function testAddLieu(){
	$_POST["latitude"]=1;
	$_POST["longitude"]=1;
	$_POST["photo_data"]="test";
	$_POST["user"]=0;
	$_POST["image_scaled"]="bla";
	addLieu();
}

function addLieu(){
	$link = connect();
	if (
				!isset($_POST["latitude"])
			||  !isset($_POST["longitude"])
			||  !isset($_POST["photo_data"])
			||  !isset($_POST["user"])
			||  !isset($_POST["image_scaled"])
		)
	{
			echo json_encode(array("error"=>"missing parameter","data"=>$_POST));	
			return;	
	}
	
	$picture_path="../pictures/".$_POST["user"];
	if (!file_exists($picture_path)) {
    	if (!mkdir($picture_path)){
    		echo json_encode(array("error"=>"dir creation error : $picture_path"));
			return;	
    	}
	}


	$fileData = base64_decode(str_replace(' ', '+', str_replace('data:image/png;base64,', '', $_POST['image_scaled'])));


	$picture_name=hash("md5",$_POST["image_scaled"]). ".png";
	$full_picture_path="$picture_path/$picture_name";

	if (!file_put_contents ($full_picture_path,$fileData)){
		echo json_encode(array("error"=>"image write error : $full_picture_path"));
		return;
	}
	
	$location = 'POINT(' . $_POST["latitude"] . " " . $_POST["longitude"] . ')';
	$statement = $link->prepare(
		"INSERT INTO cleaned(user_id, photo_data, location, photo_path)
    	VALUES(:user_id, :photo_data, PointFromText(:location), :photo_path)" );

	if (!$statement->execute(array(
    	"user_id" 		=> $_POST["user"],
    	"photo_data" 	=> $_POST["photo_data"],
    	"location" 		=> $location,
    	"photo_path" 	=> str_replace("..","/p2",$full_picture_path)

	))){
		echo json_encode(array("error"=>"execute error", "full_picture_path"=> $full_picture_path,"picture_path"=>$picture_path));		
		return;
	}
	echo  json_encode(array("ok"=>true));
}

function getLieu(){
	$statement=connect()->prepare("SELECT x(location) as latitude, y(location) as longitude, photo_data ,user_id,photo_path,id FROM cleaned");
	$statement->execute();
	echo json_encode($statement->fetchAll(PDO::FETCH_ASSOC));
}

if (!isset($_GET["fonction"]) || $_GET["fonction"]=="testAddLieu"){
	testAddLieu();	
}elseif ($_GET["fonction"]=="addLieu"){
	addLieu();	
}elseif($_GET["fonction"]=="getLieu"){
	getLieu();
}



?>
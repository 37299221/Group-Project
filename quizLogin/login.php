<!DOCTYPE html>
<?php
// connection to the database
$host="localhost";
$user="Kyle";
$password="Letmein";
$db="dbquiz";

session_start();

// test connection to the database, error message if failed
$data=mysqli_connect($host,$user,$password,$db);

if($data===false)

{

	die("connection error");

}


// pull username and password from db and make sure they match
if($_SERVER["REQUEST_METHOD"]=="POST")
{

	$username=$_POST["username"];
	$password=$_POST["password"];



	$sql="select * from login where username='".$username."' AND password='".$password."' ";

	$result=mysqli_query($data,$sql);

	$row=mysqli_fetch_array($result);

	if($row["userType"]=="user")
	{	

		$_SESSION["username"]=$username;

		header("location:index.html");
	}

	elseif($row["userType"]=="admin")
	{

		$_SESSION["username"]=$username;
		
		header("location:index.html");
	}

	else
	{
		echo "username or password incorrect";
	}

}




?>









<!DOCTYPE html>
<html>

<head>
	<title>Login To Quiz World!</title>

<!-- Link to login style sheet -->
      <link rel="stylesheet" href="css/login.css" />

</head>



<body>
<center>

	<h1>Welcome To Quiz World Please Login</h1>
	<br><br><br><br>
	
		<br><br>


		<form action="#" method="POST">

	<div>
		<label>username</label>
		<input type="text" name="username" required>
	</div>
	<br><br>

	<div>
		<label>password</label>
		<input type="password" name="password" required>
	</div>
	<br><br>

	<div>
		
		<input type="submit" value="Login">
	</div>


	</form>


	<br><br>
 </div>
</center>

</body>
</html>
<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'PHPMailer/src/Exception.php';
	require 'PHPMailer/src/PHPMailer.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'PHPMailer/language/');
	$mail->isHTML(true);

	$mail->setFrom('ivan.malafeyev@gmail.com', 'Иван Малафеев');
	$mail->addAddress('ivan.malafeyev@yandex.ru');
	$mail->Subject = 'Привет! Это Иван Малафеев';

	$body = '<h1>Встречайте супер письмо!</h1>';

	if (trim(!empty($_POST['name']))){
		$body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
	}

	if (trim(!empty($_POST['email']))){
		$body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
	}

	if (trim(!empty($_POST['nameradio']))){
		$body.='<p><strong>Вариант радио:</strong> '.$_POST['nameradio'].'</p>';
	}
	if (trim(!empty($_POST['age']))){
		$body.='<p><strong>Возраст:</strong> '.$_POST['age'].'</p>';
	}


	if (trim(!empty($_FILES['image']['tmp_name']))){
		$filePath = __DIR__ . "/files/" . $_FILES['image']['name'];
		if (copy($_FILES['image']['tmp_name'], $filePath)) {
			$fileAttach = $filePath;
			$body.='<p><strong>Фото в приложении</strong></p>';
			$mail->addAttachment($fileAttach);
		}
	}

	$mail->Body = $body;

	if (!$mail->send()) {
		$message = 'Ошибка';
	} else {
		$message = 'Данные отправлены!';
	}

	$response = ['message' => $message];
	header('Content-type: application/json');
	echo json_encode($response);
?>
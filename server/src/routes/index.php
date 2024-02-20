<?php
include_once('./controllers/bankslip.controller.php');

function router($path) {
    $request_method=$_SERVER["REQUEST_METHOD"];

    switch($request_method) {
        case 'GET':
            switch($path) {
                case '/':
                    index();
                break;
                default: 
                    http_response_code(404);
                    die();
                break;
            }
        break;
        case 'POST':
            switch($path) {
                case '/':
                    if(!isset($_FILES) || empty($_FILES)) {
                        $response = ["msg" => "Verify your file"];
                        echo json_encode($response);
                        http_response_code(400);
                        die();
                    }
                    create($_FILES);
                    return;
                break;
                default: 
                    http_response_code(404);
                    die();
                break;
            }
        break;
        default:
            http_response_code(405);
    }
    return true;
}

?>
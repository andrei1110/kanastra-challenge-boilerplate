<?php
    include_once('./model/bankslip.model.php');
    function create($data) {
        $csvHeaderCorrect = [
            "name",
            "governmentId",
            "email",
            "debtAmount",
            "debtDueDate",
            "debtId"
        ];
        $tmpName = $_FILES['csv_file']['tmp_name'];
        $file = fopen($tmpName, 'r');
        $count = 0;
        $skitHeader = true;
        $data = [];
        $conn = connect();
        $max_lines = 100000;
        $count = 0;
        while (($line = fgetcsv($file)) !== FALSE) {
            if ($skitHeader) {
                if (sizeof(array_diff($line, $csvHeaderCorrect)) > 0) {
                    http_response_code(400);
                    echo json_encode(['msg' => 'Invalid csv']);
                }
                $skitHeader = false;
                continue;
            }
            $data[] = $line;
            $count ++;
            if ($count >= $max_lines) {
                $count = 0;
                insert($data);
                $data = [];
            }
        }
        if(count($data) > 0) {
            insert($data);
        }
        fclose($file);
        return true;
    }

    function index() {
        if(isset($_FILES)) {
            unset($_FILES);
        }
        $page = isset($_GET['page']) ? $_GET['page'] : 0;
        $limit = isset($_GET['limit']) ? $_GET['limit'] : 30;
        $order = '';

        $result = select($limit, $page * $limit);

        echo json_encode($result);
        return true;
    }
?>
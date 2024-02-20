<?php
    include_once('./model/conn.php');
    function insert($data) {
        $conn = connect();

        $values = str_repeat('?,', count($data[0]) - 1) . '?';
        $sql = "INSERT INTO bank_slip (name, government_id, email, debt_amount, debt_due_date, debt_id) VALUES " .
            str_repeat("($values),", count($data) - 1) . "($values)";
        $sth = $conn->prepare ($sql);
        $sth->execute(array_merge(...$data));
        $sth->closeCursor();
        $conn = null;
    }

    function select($limit, $offset) {
        $conn = connect();

        $sql = "SELECT name, government_id as governmentId, email, debt_amount as debtAmount, debt_due_date as debtDueDate, debt_id as debtId FROM bank_slip LIMIT $offset, $limit";

        $sth = $conn->prepare($sql);
        $sth->execute();
        $response = $sth->fetchAll();
        $sth->closeCursor();
        $conn = null;

        return $response;
    }
?>
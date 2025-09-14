<?php
include '../pdo.php';

session_start();

/* ===== 回應工具 ===== */
function ok($arr){ 
    echo json_encode($arr, JSON_UNESCAPED_UNICODE); 
    exit; 
}

function err($msg, $code=400){ 
    http_response_code($code); 
    echo json_encode(['success'=>false,'message'=>$msg], JSON_UNESCAPED_UNICODE); 
    exit; 
}

/* ===== 取得會員身分 =====
   優先順序：Session -> (開發方便) URL 帶的 member_id
   （如要用 Bearer Token，可在這裡自行補上驗證對應出 member_id）
*/
$uid = (int)($_SESSION['memberID'] ?? 0);
$paramMemberId = isset($_GET['member_id']) ? (int)$_GET['member_id'] : 0;

// 若 session 沒有，但有帶 member_id，就先用；上線建議改成一定要登入
if ($uid === 0 && $paramMemberId > 0) {
  $uid = $paramMemberId;
};

if ($uid === 0) {
  err('未登入或缺少 member_id', 401);
};

/* ===== 主流程 ===== */
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // 可選：server-side 分頁（不帶 page 就一次回全部）
    $page = isset($_GET['page']) ? max(1, (int)$_GET['page']) : 0; // 0 表示不分頁
    $pageSize = max(1, min(100, (int)($_GET['pageSize'] ?? 10)));

    // 總數
    $sqlCount = "SELECT COUNT(*)
                FROM Review r
                WHERE r.member_id = :uid
                AND (r.review_status IS NULL OR r.review_status <> 'deleted'
                )";
    $stmt = $pdo->prepare($sqlCount);
    $stmt->execute([':uid' => $uid]);
    $total = (int)$stmt->fetchColumn();

    // 清單（不加 JOIN，前端會 fallback 用 `地點 #location_id`；若要顯示地點名稱，可補 LEFT JOIN Location）
    $sql = "SELECT r.ID, r.score, r.content, r.image, r.created_at, r.location_id
            FROM Review r
            WHERE r.member_id = :uid
            AND (r.review_status IS NULL OR r.review_status <> 'deleted')
            ORDER BY r.created_at DESC, r.ID DESC";
    
    if ($page > 0) {
        $offset = ($page - 1) * $pageSize;
        $sql .= " LIMIT :limit OFFSET :offset";
    }

    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':uid', $uid, PDO::PARAM_INT);

    if ($page > 0) {
        $stmt->bindValue(':limit', $pageSize, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    }
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    ok([
        'success' => true,
        'data'    => $rows,
        'total'   => $total,
    ]);
}

if ($method === 'DELETE') {
    // 只能刪自己的
    $id = (int)($_GET['id'] ?? 0);
    if ($id <= 0) err('缺少 id', 422);

    /* 硬刪除（真的從資料庫刪掉） */
    $sql = "DELETE FROM Review 
            WHERE ID = :id AND member_id = :uid 
            LIMIT 1";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':id' => $id, ':uid' => $uid]);

    if ($stmt->rowCount() === 1) {
        ok(['success' => true, 'message' => '刪除成功']);
    } else {
        err('找不到此評論或無權刪除', 404);
    }
}

err('HTTP method 不支援', 405);



?>
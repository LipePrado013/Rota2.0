<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require './vendor/autoload.php';

// $config = [
//   'settings' => [
//     'displayErrorDetails' => true,
//   ],
// ];
// $app = new \Slim\App($config);
$app = new \Slim\App;


// Middleware CORS
$app->add(function (Request $request, Response $response, $next) {
  $response = $next($request, $response);

  return $response
    ->withHeader('Access-Control-Allow-Origin', 'http://192.168.15.14:80')
    ->withHeader('Access-Control-Allow-Headers', 'Content-Type')
    ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});
function getConn()
{
  return new PDO(
    'mysql:host=localhost:3306;dbname=api_rota',
    'root',
    '',
    [PDO::MYSQL_ATTR_INIT_COMMAND  => 'SET NAMES utf8']
  );
}

$app->get('/', 'getTurismos');
$app->get('/users', 'getUsers');
$app->post('/cadUsers', 'postCadastro');

function getTurismos(Request $request, Response $response, array $args)
{
  $sql = 'SELECT * FROM tb_locais';
  $stmt = getConn()->query($sql);
  $produtos = $stmt->fetchAll(PDO::FETCH_OBJ);
  return $response->withJson($produtos);
}

function getUsers(Request $request, Response $response, array $args)
{
  $sql = 'SELECT * FROM tb_users';
  $stmt = getConn()->query($sql);
  $produtos = $stmt->fetchAll(PDO::FETCH_OBJ);
  return $response->withJson($produtos);
}

function postCadastro(Request $request, Response $response, array $args)
{
  // Obtém os dados do corpo da requisição
  $users = $request->getParsedBody();

  // Verifica se o e-mail já está cadastrado
  if (emailExists($users['email'])) {
    return $response->withJson(['status' => 'error', 'message' => 'E-mail já cadastrado']);
  }

  // Se o e-mail não existe, proceda com a inserção
  $sql = 'INSERT INTO tb_users (nome, sobrenome, cidade, email, senha, csenha) VALUES (:nome, :sobrenome, :cidade, :email, :senha, :csenha)';
  $conn = getConn();
  $stmt = $conn->prepare($sql);

  // Ajuste para usar array associativo
  $stmt->execute([
    ':nome' => $users['nome'],
    ':sobrenome' => $users['sobrenome'],
    ':cidade' => $users['cidade'],
    ':email' => $users['email'],
    ':senha' => $users['senha'],
    ':csenha' => $users['csenha'],
  ]);

  return $response->withJson(['status' => 'success']);
}

function emailExists($email)
{
  // Verifica se o e-mail já está cadastrado na base de dados
  $conn = getConn();
  $stmt = $conn->prepare('SELECT COUNT(*) FROM tb_users WHERE email = :email');
  $stmt->execute([':email' => $email]);

  return $stmt->fetchColumn() > 0;
}


$app->run();

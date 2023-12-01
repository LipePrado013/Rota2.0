<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require './vendor/autoload.php';

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
  $users = $request->getParsedBody();

  $sql = 'INSERT INTO tb_users (nome, sobrenome,cidade email, senha, csenha) VALUES (:nome, :sobrenome,:cidade,  :email, :senha, :csenha)';
  $conn = getConn();
  $stmt = $conn->prepare($sql);

  // Ajuste para usar array associativo
  $stmt->execute([
    ':nome' => $users['nome'],
    ':sobrenome' => $users['sobrenome'],
    ':email' => $users['email'],
    ':senha' => $users['senha'],
    ':csenha' => $users['csenha'],
  ]);

  return $response->withJson(['status' => 'success']);
}


$app->run();

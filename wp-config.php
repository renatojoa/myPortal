<?php
define('DB_NAME', 'renatojoa');         // Nome do banco de dados
define('DB_USER', 'root');             // Nome de usuário do banco de dados
define('DB_PASSWORD', 'oipopo');        // Senha do banco de dados
define('DB_HOST', 'localhost');         // Host do banco de dados (geralmente 'localhost')
define('DB_CHARSET', 'utf8mb4');        // Charset do banco de dados
define('DB_COLLATE', '');               // Collation do banco de dados

// Chaves de segurança (gere em https://api.wordpress.org/secret-key/1.1/salt/)
define('AUTH_KEY',         'jkhue..X!Fv3U^6Yce8DaL[|5L>XL0CRCQ.C=azoay:YFSz3|{ i6(0=Y$vS+uS>');
define('SECURE_AUTH_KEY',  'bTgu|wJA w1SiS|XK7`J)*oHwqSe|Z0dnl,(V&&MS? V0ssvDn,n;3C2 57-*+=R');
define('LOGGED_IN_KEY',    'tQ O1gda{|b)-$Gm2m&IBqxzOt<!~d%i|C{8RI~8Ddum+|A@ghF9aL`/X kTW+qo');
define('NONCE_KEY',        '(-Q3+N]|+^yO{?m6_^]e,7&h&KM}-C+&u%n~E.GS<`L%y5qfkEZ*S.(|(Dz#p/h7');
define('AUTH_SALT',        '1MUT[Q~*Z-1C|iPJHeS,+D`w3zUF)+eC!O-|,zji{,-Plx|*)6ndTC+-8A+kwpCA');
define('SECURE_AUTH_SALT', 'KF)&DGTa+%/e`7uDDxRi7I/kXv}whsJ&p$u`t(SKDGD|:?lo#|e8W.rF2L2331><');
define('LOGGED_IN_SALT',   '-mY@;C<h67?7m6_@*!bYt5/*i+hLPu4_bdZsDI*)+iCbz1H1[WbE5:@mDU]+@UPu');
define('NONCE_SALT',       'oh07Z(6 }oww7[]A,R<rpf|.1cI_;,~>X6o1@P+*gC&YLPI>@iL_y C,+m#+sEbD');

$table_prefix = 'wp_';                  // Prefixo das tabelas do WordPress

define('WP_DEBUG', false);              // Modo de depuração (desativado)

if (!defined('ABSPATH')) {
    define('ABSPATH', __DIR__ . '/');
}

require_once ABSPATH . 'wp-settings.php';
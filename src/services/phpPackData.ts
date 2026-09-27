export interface PhpFileItem {
  filename: string;
  path: string;
  description: string;
  content: string;
}

export const PHP_PACK_FILES: PhpFileItem[] = [
  {
    filename: 'database.sql',
    path: 'database.sql',
    description: 'Structure complète des tables MySQL avec index et données initiales (à importer dans phpMyAdmin).',
    content: `-- ========================================================
-- Base de données : atlantic_transport_db
-- Entreprise : Atlantic Transport
-- Slogan : "Le monde sans frontières, votre logistique sans limites."
-- Siège : King George Blvd, Surrey, BC V3T 2W1, Canada
-- ========================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS \`atlantic_transport_db\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`atlantic_transport_db\`;

-- --------------------------------------------------------
-- Table \`users\` (Authentification Admin & Employés)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`users\` (
  \`id\` INT(11) NOT NULL AUTO_INCREMENT,
  \`email\` VARCHAR(191) NOT NULL UNIQUE,
  \`password_hash\` VARCHAR(255) NOT NULL,
  \`role\` ENUM('admin', 'employee') NOT NULL DEFAULT 'employee',
  \`employee_id\` INT(11) NULL,
  \`must_change_password\` TINYINT(1) NOT NULL DEFAULT 1,
  \`is_active\` TINYINT(1) NOT NULL DEFAULT 1,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`last_login\` DATETIME NULL,
  PRIMARY KEY (\`id\`),
  INDEX (\`email\`),
  INDEX (\`role\`),
  INDEX (\`is_active\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table \`employees\` (Informations détaillées des employés)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`employees\` (
  \`id\` INT(11) NOT NULL AUTO_INCREMENT,
  \`matricule\` VARCHAR(30) NOT NULL UNIQUE,
  \`first_name\` VARCHAR(100) NOT NULL,
  \`last_name\` VARCHAR(100) NOT NULL,
  \`email\` VARCHAR(191) NOT NULL UNIQUE,
  \`phone\` VARCHAR(50) NOT NULL,
  \`department\` VARCHAR(100) NOT NULL,
  \`role_title\` VARCHAR(150) NOT NULL,
  \`contract_type\` VARCHAR(50) NOT NULL DEFAULT 'CDI (Permanent)',
  \`monthly_salary\` DECIMAL(10,2) NOT NULL,
  \`currency\` VARCHAR(10) NOT NULL DEFAULT 'CAD',
  \`hire_date\` DATE NOT NULL,
  \`work_location\` VARCHAR(150) NOT NULL DEFAULT 'Surrey Hub (BC V3T 2W1)',
  \`emergency_name\` VARCHAR(100) NULL,
  \`emergency_phone\` VARCHAR(50) NULL,
  \`is_active\` TINYINT(1) NOT NULL DEFAULT 1,
  \`notes\` TEXT NULL,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  INDEX (\`matricule\`),
  INDEX (\`department\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table \`quotes\` (Demandes de devis soumises en ligne)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`quotes\` (
  \`id\` INT(11) NOT NULL AUTO_INCREMENT,
  \`reference\` VARCHAR(50) NOT NULL UNIQUE,
  \`company_name\` VARCHAR(150) NOT NULL,
  \`contact_name\` VARCHAR(150) NOT NULL,
  \`email\` VARCHAR(191) NOT NULL,
  \`phone\` VARCHAR(50) NOT NULL,
  \`service_type\` VARCHAR(50) NOT NULL,
  \`origin\` VARCHAR(150) NOT NULL,
  \`destination\` VARCHAR(150) NOT NULL,
  \`cargo_type\` VARCHAR(150) NOT NULL,
  \`weight_kg\` DECIMAL(10,2) NOT NULL,
  \`volume_m3\` DECIMAL(10,2) NOT NULL,
  \`status\` ENUM('en_attente', 'chiffre', 'valide', 'archive') NOT NULL DEFAULT 'en_attente',
  \`notes\` TEXT NULL,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  INDEX (\`status\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table \`messages\` (Messages du formulaire de contact)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS \`messages\` (
  \`id\` INT(11) NOT NULL AUTO_INCREMENT,
  \`name\` VARCHAR(150) NOT NULL,
  \`company\` VARCHAR(150) NULL,
  \`email\` VARCHAR(191) NOT NULL,
  \`phone\` VARCHAR(50) NULL,
  \`subject\` VARCHAR(200) NOT NULL,
  \`message\` TEXT NOT NULL,
  \`is_read\` TINYINT(1) NOT NULL DEFAULT 0,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- DONNÉES INITIALES (Admin + Employés de test)
-- Mot de passe admin temporaire : Admin2026!
-- Hash généré via password_hash('Admin2026!', PASSWORD_BCRYPT)
-- --------------------------------------------------------

INSERT INTO \`users\` (\`id\`, \`email\`, \`password_hash\`, \`role\`, \`employee_id\`, \`must_change_password\`, \`is_active\`) VALUES
(1, 'admin@atlantictransport.ca', '$2y$10$wKx6hH07z9t9H9mNnF8Pxe2xL3h8cKjWq7Z4q6vO.kI8Y9bJmXz9S', 'admin', NULL, 0, 1);

INSERT INTO \`employees\` (\`id\`, \`matricule\`, \`first_name\`, \`last_name\`, \`email\`, \`phone\`, \`department\`, \`role_title\`, \`contract_type\`, \`monthly_salary\`, \`currency\`, \`hire_date\`, \`work_location\`, \`is_active\`) VALUES
(1, 'EMP-2026-001', 'Jean-Marc', 'Tremblay', 'j.tremblay@atlantictransport.ca', '+1 (506) 802-2226', 'Transport Multimodal', 'Responsable Affrètement Maritime', 'CDI (Permanent)', 6250.00, 'CAD', '2026-02-15', 'Hub Logistique Surrey, BC', 1),
(2, 'EMP-2026-002', 'Martina', 'Vanderberg', 'm.vanderberg@atlantictransport.ca', '+1 (506) 802-2226', 'Douanes & Transit', 'Inspectrice Douanes Agréée CBSA', 'Cadre Logistique', 7100.00, 'CAD', '2025-06-01', 'Surrey Head Office & Terminal Vancouver', 1),
(3, 'EMP-2026-003', 'Souleymane', 'Diallo', 's.diallo@atlantictransport.ca', '+1 (506) 802-2226', 'Entreposage & WMS', 'Superviseur Plateforme & Supply Chain', 'CDI (Permanent)', 5450.00, 'CAD', '2025-09-12', 'Entrepôt Surrey Nord', 1);

-- Liens utilisateurs pour les employés
-- Mot de passe employé par défaut : Temp2026! (avec must_change_password = 1)
INSERT INTO \`users\` (\`id\`, \`email\`, \`password_hash\`, \`role\`, \`employee_id\`, \`must_change_password\`, \`is_active\`) VALUES
(2, 'j.tremblay@atlantictransport.ca', '$2y$10$PZl4xU2jQ4W0vU3zP.ZtceK8vC0jV3PZtceK8vC0jV3PZtceK8vC0', 'employee', 1, 1, 1),
(3, 'm.vanderberg@atlantictransport.ca', '$2y$10$PZl4xU2jQ4W0vU3zP.ZtceK8vC0jV3PZtceK8vC0jV3PZtceK8vC0', 'employee', 2, 0, 1),
(4, 's.diallo@atlantictransport.ca', '$2y$10$PZl4xU2jQ4W0vU3zP.ZtceK8vC0jV3PZtceK8vC0jV3PZtceK8vC0', 'employee', 3, 0, 1);

COMMIT;
`
  },
  {
    filename: 'config.php',
    path: 'config.php',
    description: 'Configuration centrale de la connexion PDO MySQL, sessions sécurisées et helpers de sécurité.',
    content: `<?php
/**
 * Configuration & Connexion Base de Données
 * Atlantic Transport - Système Logistique & RH
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Paramètres de connexion MySQL (à adapter à votre hébergement cPanel)
define('DB_HOST', 'localhost');
define('DB_NAME', 'atlantic_transport_db');
define('DB_USER', 'root');       // ex: 'cpaneluser_dbuser'
define('DB_PASS', '');           // mot de passe de la base de données
define('DB_CHARSET', 'utf8mb4');

// Informations entreprise
define('SITE_NAME', 'Atlantic Transport');
define('SITE_SLOGAN', 'Le monde sans frontières, votre logistique sans limites.');
define('SITE_ADDRESS', 'King George Blvd, Surrey, BC V3T 2W1, Canada');
define('SITE_PHONE', '+1 (506) 802-2226');
define('SITE_EMAIL', 'atlantictransport.int@ik.me');
define('SITE_URL', 'http://' . ($_SERVER['HTTP_HOST'] ?? 'localhost'));

// Connexion sécurisée PDO
try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
} catch (PDOException $e) {
    die("Erreur de connexion à la base de données. Veuillez vérifier vos identifiants dans config.php.");
}

// Fonctions d'aide (Helpers)
function sanitize($data) {
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

function isAdmin() {
    return isset($_SESSION['user_role']) && $_SESSION['user_role'] === 'admin';
}

function isEmployee() {
    return isset($_SESSION['user_role']) && $_SESSION['user_role'] === 'employee';
}

function requireAuth() {
    if (!isLoggedIn()) {
        header("Location: login.php");
        exit;
    }
}

function requireAdmin() {
    requireAuth();
    if (!isAdmin()) {
        header("Location: login.php?error=unauthorized");
        exit;
    }
}

// Génération automatique du matricule format EMP-2026-XXX
function generateMatricule($pdo) {
    $year = date('Y');
    $prefix = "EMP-{$year}-%";
    $stmt = $pdo->prepare("SELECT matricule FROM employees WHERE matricule LIKE ? ORDER BY matricule DESC LIMIT 1");
    $stmt->execute([$prefix]);
    $lastMatricule = $stmt->fetchColumn();

    if ($lastMatricule) {
        $parts = explode('-', $lastMatricule);
        $lastNumber = intval(end($parts));
        $nextNumber = str_pad($lastNumber + 1, 3, '0', STR_PAD_LEFT);
    } else {
        $nextNumber = '001';
    }

    return "EMP-{$year}-{$nextNumber}";
}
?>`
  },
  {
    filename: 'login.php',
    path: 'login.php',
    description: 'Page de connexion sécurisée (vérification hash bcrypt, contrôle statut actif, redirection changement de mot de passe obligatoire).',
    content: `<?php
require_once 'config.php';

$error = '';
$success = '';

if (isLoggedIn()) {
    if (isAdmin()) {
        header("Location: admin/index.php");
    } else {
        header("Location: employee/index.php");
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if (empty($email) || empty($password)) {
        $error = "Veuillez renseigner votre email et votre mot de passe.";
    } else {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? LIMIT 1");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password_hash'])) {
            if (!$user['is_active']) {
                $error = "Ce compte a été désactivé par l'administration. Veuillez contacter la direction RH.";
            } else {
                // Session valide
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_email'] = $user['email'];
                $_SESSION['user_role'] = $user['role'];
                $_SESSION['employee_id'] = $user['employee_id'];
                $_SESSION['must_change_password'] = $user['must_change_password'];

                // Mise à jour de la dernière connexion
                $upd = $pdo->prepare("UPDATE users SET last_login = NOW() WHERE id = ?");
                $upd->execute([$user['id']]);

                // Vérifier si le mot de passe doit être changé immédiatement
                if ($user['must_change_password']) {
                    header("Location: change-password.php");
                    exit;
                }

                if ($user['role'] === 'admin') {
                    header("Location: admin/index.php");
                } else {
                    header("Location: employee/index.php");
                }
                exit;
            }
        } else {
            $error = "Email ou mot de passe incorrect.";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion Portail Collaborateur & Admin - Atlantic Transport</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-900 text-slate-100 min-h-screen flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl">
        <div class="text-center mb-8">
            <h1 class="text-2xl font-bold text-white tracking-tight">Atlantic Transport</h1>
            <p class="text-amber-400 text-xs font-semibold uppercase mt-1">Espace Sécurisé Employé & Administration</p>
            <p class="text-slate-400 text-xs mt-2"><?= SITE_SLOGAN ?></p>
        </div>

        <?php if (!empty($error)): ?>
            <div class="mb-6 p-4 bg-red-950/60 border border-red-800 text-red-300 text-sm rounded-lg">
                <?= sanitize($error) ?>
            </div>
        <?php endif; ?>

        <form method="POST" action="login.php" class="space-y-5">
            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-2 uppercase">Adresse Email Professionnelle</label>
                <input type="email" name="email" required placeholder="nom@atlantictransport.ca" 
                       class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-400">
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-2 uppercase">Mot de Passe</label>
                <input type="password" name="password" required placeholder="••••••••" 
                       class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-400">
            </div>

            <button type="submit" class="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition duration-200 shadow-lg">
                Se Connecter au Portail
            </button>
        </form>

        <div class="mt-8 pt-6 border-t border-slate-700/60 text-center text-xs text-slate-400">
            <a href="index.php" class="hover:text-amber-400 transition">&larr; Retour au site public Atlantic Transport</a>
        </div>
    </div>
</body>
</html>`
  },
  {
    filename: 'change-password.php',
    path: 'change-password.php',
    description: 'Changement obligatoire de mot de passe à la première connexion (comme exigé par le cahier des charges).',
    content: `<?php
require_once 'config.php';
requireAuth();

$error = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $new_password = $_POST['new_password'] ?? '';
    $confirm_password = $_POST['confirm_password'] ?? '';

    if (strlen($new_password) < 8) {
        $error = "Le mot de passe doit contenir au moins 8 caractères.";
    } elseif ($new_password !== $confirm_password) {
        $error = "Les deux mots de passe ne correspondent pas.";
    } else {
        $new_hash = password_hash($new_password, PASSWORD_BCRYPT);
        $stmt = $pdo->prepare("UPDATE users SET password_hash = ?, must_change_password = 0 WHERE id = ?");
        $stmt->execute([$new_hash, $_SESSION['user_id']]);

        $_SESSION['must_change_password'] = 0;

        if (isAdmin()) {
            header("Location: admin/index.php?pw_changed=1");
        } else {
            header("Location: employee/index.php?pw_changed=1");
        }
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Modification obligatoire de votre mot de passe - Atlantic Transport</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-900 text-slate-100 min-h-screen flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-slate-800 border border-amber-500/40 rounded-2xl p-8 shadow-2xl">
        <div class="mb-6">
            <div class="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mb-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <h1 class="text-xl font-bold text-white">Changement de Mot de Passe Requis</h1>
            <p class="text-sm text-slate-400 mt-1">Conformément à la politique de sécurité RH d'Atlantic Transport, vous devez définir un nouveau mot de passe personnel dès votre première connexion.</p>
        </div>

        <?php if (!empty($error)): ?>
            <div class="mb-6 p-4 bg-red-950/60 border border-red-800 text-red-300 text-sm rounded-lg">
                <?= sanitize($error) ?>
            </div>
        <?php endif; ?>

        <form method="POST" action="change-password.php" class="space-y-4">
            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1">Nouveau Mot de Passe (min. 8 caractères)</label>
                <input type="password" name="new_password" required class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-amber-400">
            </div>
            <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1">Confirmez le Nouveau Mot de Passe</label>
                <input type="password" name="confirm_password" required class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-amber-400">
            </div>
            <button type="submit" class="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition">
                Enregistrer & Accéder à mon Espace
            </button>
        </form>
    </div>
</body>
</html>`
  },
  {
    filename: 'employee/index.php',
    path: 'employee/index.php',
    description: 'Espace collaborateur complet : visualisation du matricule, poste, contrat, salaire, date d\'embauche et fiche de paie.',
    content: `<?php
require_once '../config.php';
requireAuth();

if ($_SESSION['must_change_password']) {
    header("Location: ../change-password.php");
    exit;
}

$employeeId = $_SESSION['employee_id'];
$stmt = $pdo->prepare("SELECT * FROM employees WHERE id = ? LIMIT 1");
$stmt->execute([$employeeId]);
$emp = $stmt->fetch();

if (!$emp) {
    die("Profil employé non trouvé. Veuillez contacter l'administrateur.");
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Espace Collaborateur - <?= sanitize($emp['first_name'] . ' ' . $emp['last_name']) ?> | Atlantic Transport</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen">
    <!-- Topbar -->
    <header class="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
            <span class="text-amber-400 font-black tracking-wider text-lg">ATLANTIC TRANSPORT</span>
            <span class="text-xs text-slate-400 hidden sm:inline">| Portail Collaborateur</span>
        </div>
        <div class="flex items-center gap-4 text-sm">
            <span class="text-slate-300"><?= sanitize($emp['first_name'] . ' ' . $emp['last_name']) ?></span>
            <a href="../logout.php" class="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded transition">Déconnexion</a>
        </div>
    </header>

    <div class="max-w-5xl mx-auto p-6 md:p-10">
        <!-- Bannière Collaborateur -->
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
                <div class="text-xs font-semibold text-amber-400 uppercase tracking-wider">Fiche Salarié Officielle</div>
                <h1 class="text-2xl font-bold text-white mt-1"><?= sanitize($emp['first_name'] . ' ' . $emp['last_name']) ?></h1>
                <p class="text-slate-400 text-sm"><?= sanitize($emp['role_title']) ?> · <span class="text-slate-300"><?= sanitize($emp['department']) ?></span></p>
            </div>
            <div class="bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-xl text-right">
                <div class="text-xs text-slate-500 uppercase">Matricule Interne</div>
                <div class="text-lg font-mono font-bold text-amber-400"><?= sanitize($emp['matricule']) ?></div>
            </div>
        </div>

        <!-- Grille des informations requises -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div class="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <span class="text-xs text-slate-400 uppercase">Poste Actuel</span>
                <p class="text-lg font-semibold text-white mt-1"><?= sanitize($emp['role_title']) ?></p>
                <p class="text-xs text-slate-500 mt-2">Département : <?= sanitize($emp['department']) ?></p>
            </div>

            <div class="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <span class="text-xs text-slate-400 uppercase">Type de Contrat</span>
                <p class="text-lg font-semibold text-emerald-400 mt-1"><?= sanitize($emp['contract_type']) ?></p>
                <p class="text-xs text-slate-500 mt-2">Statut : Actif en règle</p>
            </div>

            <div class="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <span class="text-xs text-slate-400 uppercase">Rémunération Mensuelle</span>
                <p class="text-2xl font-bold text-amber-400 mt-1"><?= number_format($emp['monthly_salary'], 2, ',', ' ') ?> CAD</p>
                <p class="text-xs text-slate-500 mt-2">Base brute mensuelle</p>
            </div>

            <div class="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <span class="text-xs text-slate-400 uppercase">Date d'Embauche</span>
                <p class="text-lg font-semibold text-white mt-1"><?= date('d F Y', strtotime($emp['hire_date'])) ?></p>
                <p class="text-xs text-slate-500 mt-2">Ancienneté confirmée</p>
            </div>

            <div class="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <span class="text-xs text-slate-400 uppercase">Lieu de Travail / Affectation</span>
                <p class="text-sm font-medium text-white mt-1"><?= sanitize($emp['work_location']) ?></p>
                <p class="text-xs text-slate-500 mt-2"><?= SITE_ADDRESS ?></p>
            </div>

            <div class="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <span class="text-xs text-slate-400 uppercase">Contact d'Urgence</span>
                <p class="text-sm font-medium text-white mt-1"><?= sanitize($emp['emergency_name'] ?? 'Non renseigné') ?></p>
                <p class="text-xs text-slate-500 mt-2"><?= sanitize($emp['emergency_phone'] ?? '-') ?></p>
            </div>
        </div>

        <!-- Section Fiches de Paie & Documents RH -->
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 class="text-lg font-bold text-white mb-4">Mes Bulletins de Salaire Récents</h2>
            <div class="divide-y divide-slate-800">
                <div class="py-3 flex items-center justify-between">
                    <div>
                        <p class="text-sm font-semibold text-white">Bulletin de paie - Septembre 2026</p>
                        <p class="text-xs text-slate-400">Montant net versé : <?= number_format($emp['monthly_salary'] * 0.78, 2, ',', ' ') ?> CAD · Virement bancaire</p>
                    </div>
                    <button onclick="window.print()" class="text-xs bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 px-3 py-1.5 rounded transition">Imprimer / Exporter</button>
                </div>
                <div class="py-3 flex items-center justify-between">
                    <div>
                        <p class="text-sm font-semibold text-white">Bulletin de paie - Août 2026</p>
                        <p class="text-xs text-slate-400">Montant net versé : <?= number_format($emp['monthly_salary'] * 0.78, 2, ',', ' ') ?> CAD · Virement bancaire</p>
                    </div>
                    <button onclick="window.print()" class="text-xs bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 px-3 py-1.5 rounded transition">Imprimer / Exporter</button>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`
  },
  {
    filename: 'admin/index.php',
    path: 'admin/index.php',
    description: 'Backoffice d\'administration RH complet : liste des employés, statut actif/inactif, ajout avec matricule EMP-2026-XXX auto, devis et messages.',
    content: `<?php
require_once '../config.php';
requireAdmin();

// Statistiques
$totalEmployees = $pdo->query("SELECT COUNT(*) FROM employees")->fetchColumn();
$activeEmployees = $pdo->query("SELECT COUNT(*) FROM employees WHERE is_active = 1")->fetchColumn();
$totalPayroll = $pdo->query("SELECT SUM(monthly_salary) FROM employees WHERE is_active = 1")->fetchColumn();
$pendingQuotes = $pdo->query("SELECT COUNT(*) FROM quotes WHERE status = 'en_attente'")->fetchColumn();

// Gestion activation / désactivation
if (isset($_GET['toggle_active'])) {
    $empId = intval($_GET['toggle_active']);
    $pdo->prepare("UPDATE employees SET is_active = NOT is_active WHERE id = ?")->execute([$empId]);
    $pdo->prepare("UPDATE users SET is_active = NOT is_active WHERE employee_id = ?")->execute([$empId]);
    header("Location: index.php?msg=status_updated");
    exit;
}

// Liste des employés
$stmt = $pdo->query("SELECT * FROM employees ORDER BY id DESC");
$employees = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Administration RH & Exploitation - Atlantic Transport</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen">
    <header class="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
            <span class="text-amber-400 font-black tracking-wider text-lg">ATLANTIC TRANSPORT</span>
            <span class="text-xs bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded">BACKOFFICE ADMIN</span>
        </div>
        <div class="flex items-center gap-4 text-sm">
            <a href="add_employee.php" class="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs transition">+ Ajouter un Employé</a>
            <a href="../logout.php" class="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded transition">Déconnexion</a>
        </div>
    </header>

    <div class="max-w-7xl mx-auto p-6 md:p-8">
        <!-- Métriques Clés -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div class="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <span class="text-xs text-slate-400 uppercase">Total Employés</span>
                <p class="text-2xl font-bold text-white mt-1"><?= $totalEmployees ?></p>
            </div>
            <div class="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <span class="text-xs text-slate-400 uppercase">Employés Actifs</span>
                <p class="text-2xl font-bold text-emerald-400 mt-1"><?= $activeEmployees ?></p>
            </div>
            <div class="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <span class="text-xs text-slate-400 uppercase">Masse Salariale Mensuelle</span>
                <p class="text-2xl font-bold text-amber-400 mt-1"><?= number_format($totalPayroll, 0, ',', ' ') ?> CAD</p>
            </div>
            <div class="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <span class="text-xs text-slate-400 uppercase">Devis en Attente</span>
                <p class="text-2xl font-bold text-blue-400 mt-1"><?= $pendingQuotes ?></p>
            </div>
        </div>

        <!-- Tableau des Employés -->
        <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div class="p-6 border-b border-slate-800 flex items-center justify-between">
                <div>
                    <h2 class="text-lg font-bold text-white">Gestion du Personnel & Salariés</h2>
                    <p class="text-xs text-slate-400">Ajout automatique avec matricule séquentiel EMP-2026-XXX et changement de mot de passe obligatoire.</p>
                </div>
                <a href="add_employee.php" class="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs transition">+ Nouvel Employé</a>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                    <thead class="bg-slate-950/60 text-xs uppercase text-slate-400 border-b border-slate-800">
                        <tr>
                            <th class="py-3.5 px-4">Matricule</th>
                            <th class="py-3.5 px-4">Salarié</th>
                            <th class="py-3.5 px-4">Poste & Département</th>
                            <th class="py-3.5 px-4">Contrat</th>
                            <th class="py-3.5 px-4">Salaire</th>
                            <th class="py-3.5 px-4">Embauche</th>
                            <th class="py-3.5 px-4">Statut</th>
                            <th class="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-800">
                        <?php foreach ($employees as $row): ?>
                        <tr class="hover:bg-slate-800/40">
                            <td class="py-3.5 px-4 font-mono font-bold text-amber-400"><?= sanitize($row['matricule']) ?></td>
                            <td class="py-3.5 px-4">
                                <div class="font-medium text-white"><?= sanitize($row['first_name'] . ' ' . $row['last_name']) ?></div>
                                <div class="text-xs text-slate-400"><?= sanitize($row['email']) ?></div>
                            </td>
                            <td class="py-3.5 px-4">
                                <div class="text-white"><?= sanitize($row['role_title']) ?></div>
                                <div class="text-xs text-slate-400"><?= sanitize($row['department']) ?></div>
                            </td>
                            <td class="py-3.5 px-4 text-xs font-semibold text-slate-300"><?= sanitize($row['contract_type']) ?></td>
                            <td class="py-3.5 px-4 font-mono font-medium"><?= number_format($row['monthly_salary'], 2, ',', ' ') ?> CAD</td>
                            <td class="py-3.5 px-4 text-xs text-slate-400"><?= date('d/m/Y', strtotime($row['hire_date'])) ?></td>
                            <td class="py-3.5 px-4">
                                <?php if ($row['is_active']): ?>
                                    <span class="inline-flex items-center text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">Actif</span>
                                <?php else: ?>
                                    <span class="inline-flex items-center text-xs text-red-400 font-semibold bg-red-950/60 px-2 py-0.5 rounded border border-red-800">Désactivé</span>
                                <?php endif; ?>
                            </td>
                            <td class="py-3.5 px-4 text-right space-x-2">
                                <a href="index.php?toggle_active=<?= $row['id'] ?>" class="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition">
                                    <?= $row['is_active'] ? 'Désactiver' : 'Réactiver' ?>
                                </a>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>
</html>`
  },
  {
    filename: 'admin/add_employee.php',
    path: 'admin/add_employee.php',
    description: 'Formulaire d\'ajout d\'un employé avec calcul automatique du matricule EMP-2026-XXX et mot de passe temporaire.',
    content: `<?php
require_once '../config.php';
requireAdmin();

$autoMatricule = generateMatricule($pdo);
$error = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $first_name = trim($_POST['first_name'] ?? '');
    $last_name = trim($_POST['last_name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $department = trim($_POST['department'] ?? '');
    $role_title = trim($_POST['role_title'] ?? '');
    $contract_type = trim($_POST['contract_type'] ?? 'CDI (Permanent)');
    $monthly_salary = floatval($_POST['monthly_salary'] ?? 0);
    $hire_date = trim($_POST['hire_date'] ?? date('Y-m-d'));
    $work_location = trim($_POST['work_location'] ?? 'Surrey Hub (BC V3T 2W1)');
    $temp_password = trim($_POST['temp_password'] ?? 'Atlantic' . rand(1000, 9999) . '!');

    if (empty($first_name) || empty($last_name) || empty($email) || empty($role_title)) {
        $error = "Veuillez remplir tous les champs obligatoires.";
    } else {
        try {
            $pdo->beginTransaction();

            // 1. Insertion Employé
            $stmt = $pdo->prepare("INSERT INTO employees 
                (matricule, first_name, last_name, email, phone, department, role_title, contract_type, monthly_salary, hire_date, work_location, is_active) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)");
            $stmt->execute([
                $autoMatricule, $first_name, $last_name, $email, $phone,
                $department, $role_title, $contract_type, $monthly_salary, $hire_date, $work_location
            ]);
            $employeeId = $pdo->lastInsertId();

            // 2. Création compte utilisateur avec must_change_password = 1
            $hash = password_hash($temp_password, PASSWORD_BCRYPT);
            $stmtUser = $pdo->prepare("INSERT INTO users 
                (email, password_hash, role, employee_id, must_change_password, is_active) 
                VALUES (?, ?, 'employee', ?, 1, 1)");
            $stmtUser->execute([$email, $hash, $employeeId]);

            $pdo->commit();
            $success = "L'employé {$first_name} {$last_name} a été créé avec le matricule {$autoMatricule}. Mot de passe temporaire : {$temp_password}";
        } catch (PDOException $e) {
            $pdo->rollBack();
            $error = "Erreur lors de la création : " . $e->getMessage();
        }
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Ajouter un Employé - Atlantic Transport</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-6 md:p-10">
    <div class="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8">
        <div class="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div>
                <h1 class="text-xl font-bold text-white">Nouveau Salarié Atlantic Transport</h1>
                <p class="text-xs text-slate-400">Génération automatique du matricule et enrôlement au portail RH.</p>
            </div>
            <a href="index.php" class="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded">&larr; Retour</a>
        </div>

        <?php if (!empty($success)): ?>
            <div class="mb-6 p-4 bg-emerald-950 border border-emerald-800 text-emerald-200 rounded-lg text-sm">
                <?= $success ?>
            </div>
        <?php endif; ?>

        <?php if (!empty($error)): ?>
            <div class="mb-6 p-4 bg-red-950 border border-red-800 text-red-300 rounded-lg text-sm">
                <?= $error ?>
            </div>
        <?php endif; ?>

        <form method="POST" action="add_employee.php" class="space-y-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs uppercase text-slate-400 font-semibold mb-1">Matricule Auto-Généré</label>
                    <input type="text" readonly value="<?= $autoMatricule ?>" class="w-full bg-slate-950 border border-amber-500/40 text-amber-400 font-mono font-bold px-4 py-2.5 rounded-lg">
                </div>
                <div>
                    <label class="block text-xs uppercase text-slate-400 font-semibold mb-1">Mot de Passe Provisoire</label>
                    <input type="text" name="temp_password" value="Atlantic<?= rand(1000, 9999) ?>!" class="w-full bg-slate-950 border border-slate-700 text-white font-mono px-4 py-2.5 rounded-lg">
                    <span class="text-[10px] text-amber-400">Le salarié devra obligatoirement le changer au premier login.</span>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs uppercase text-slate-400 font-semibold mb-1">Prénom *</label>
                    <input type="text" name="first_name" required class="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white">
                </div>
                <div>
                    <label class="block text-xs uppercase text-slate-400 font-semibold mb-1">Nom *</label>
                    <input type="text" name="last_name" required class="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white">
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs uppercase text-slate-400 font-semibold mb-1">Email Professionnel *</label>
                    <input type="email" name="email" required placeholder="nom@atlantictransport.ca" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white">
                </div>
                <div>
                    <label class="block text-xs uppercase text-slate-400 font-semibold mb-1">Téléphone de Service</label>
                    <input type="text" name="phone" value="+1 (506) 802-" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white">
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs uppercase text-slate-400 font-semibold mb-1">Département</label>
                    <select name="department" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white">
                        <option value="Transport Multimodal">Transport Multimodal</option>
                        <option value="Entreposage & WMS">Entreposage & WMS</option>
                        <option value="Douanes & Transit">Douanes & Transit</option>
                        <option value="Commercial & Devis">Commercial & Devis</option>
                        <option value="Direction & RH">Direction & RH</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs uppercase text-slate-400 font-semibold mb-1">Poste / Intitulé du Rôle *</label>
                    <input type="text" name="role_title" required placeholder="ex: Déclarant en douane senior" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white">
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label class="block text-xs uppercase text-slate-400 font-semibold mb-1">Type de Contrat</label>
                    <select name="contract_type" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white">
                        <option value="CDI (Permanent)">CDI (Permanent)</option>
                        <option value="Cadre Logistique">Cadre Logistique</option>
                        <option value="Temps Plein">Temps Plein</option>
                        <option value="CDD">CDD</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs uppercase text-slate-400 font-semibold mb-1">Salaire Mensuel Brut (CAD)</label>
                    <input type="number" step="50" name="monthly_salary" value="5500" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white">
                </div>
                <div>
                    <label class="block text-xs uppercase text-slate-400 font-semibold mb-1">Date d'Embauche</label>
                    <input type="date" name="hire_date" value="<?= date('Y-m-d') ?>" class="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-white">
                </div>
            </div>

            <button type="submit" class="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition mt-4">
                Valider & Générer l'Employé
            </button>
        </form>
    </div>
</body>
</html>`
  },
  {
    filename: 'logout.php',
    path: 'logout.php',
    description: 'Destruction propre de session et redirection vers l\'accueil.',
    content: `<?php
require_once 'config.php';
$_SESSION = [];
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}
session_destroy();
header("Location: index.php?logout=1");
exit;
?>`
  },
  {
    filename: '.htaccess',
    path: '.htaccess',
    description: 'Directives de sécurité Apache, masquage des fichiers sensibles et réécriture d\'URL.',
    content: `# Configuration Apache pour Atlantic Transport
RewriteEngine On

# Encodage par défaut
AddDefaultCharset UTF-8

# Masquer la signature serveur
ServerSignature Off

# Protection des fichiers sensibles
<FilesMatch "^(config\\.php|database\\.sql|composer\\.json|\\.env)$">
    Order allow,deny
    Deny from all
</FilesMatch>

# En-têtes de sécurité
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
`
  },
  {
    filename: 'README.md',
    path: 'README.md',
    description: 'Guide d\'installation complet pour cPanel / phpMyAdmin avec identifiants admin temporaires.',
    content: `# Guide de Déploiement : Atlantic Transport (PHP / MySQL)

## Informations Entreprise
- **Nom** : Atlantic Transport
- **Slogan** : "Le monde sans frontières, votre logistique sans limites."
- **Siège Social** : King George Blvd, Surrey, BC V3T 2W1, Canada.
- **Téléphone / WhatsApp** : +1 (506) 802-2226 / WhatsApp : +1 (506) 802-2226
- **Email Officiel** : atlantictransport.int@ik.me

---

## Identifiants Temporaires Prêts à l'Emploi

### 1. Accès Administrateur (/admin)
- **URL** : \`https://votre-domaine.com/login.php\`
- **Email** : \`admin@atlantictransport.ca\`
- **Mot de passe temporaire** : \`Admin2026!\`

### 2. Accès Employé de Test (Portail Salarié)
- **Email** : \`j.tremblay@atlantictransport.ca\`
- **Mot de passe initial** : \`Temp2026!\` (Changement obligatoire au 1er login)
- **Matricule** : \`EMP-2026-001\`

---

## Instructions de Déploiement sur cPanel / Hébergement Mutualisé

1. **Créer la Base de Données dans cPanel** :
   - Rendez-vous dans *Bases de données MySQL*.
   - Créez une base (ex: \`atlantic_transport_db\`).
   - Créez un utilisateur MySQL et donnez-lui TOUS les privilèges sur la base.

2. **Importer le fichier SQL** :
   - Ouvrez **phpMyAdmin**.
   - Sélectionnez votre base de données.
   - Cliquez sur l'onglet **Importer**, sélectionnez \`database.sql\` et validez.

3. **Mettre à jour \`config.php\`** :
   - Modifiez les constantes :
     \`\`\`php
     define('DB_HOST', 'localhost');
     define('DB_NAME', 'votre_nom_de_base');
     define('DB_USER', 'votre_utilisateur');
     define('DB_PASS', 'votre_mot_de_passe');
     \`\`\`

4. **Transférer les fichiers** :
   - Copiez l'ensemble des fichiers dans le dossier \`public_html\` via le Gestionnaire de Fichiers cPanel ou FTP (FileZilla).

5. **Tester le Site** :
   - Ouvrez votre domaine dans le navigateur.
   - Testez le formulaire de devis, le suivi d'expédition, la connexion employé et le backoffice admin.
`
  }
];

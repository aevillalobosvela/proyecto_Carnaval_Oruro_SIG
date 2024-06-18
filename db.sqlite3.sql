BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "django_migrations" (
	"id"	integer NOT NULL,
	"app"	varchar(255) NOT NULL,
	"name"	varchar(255) NOT NULL,
	"applied"	datetime NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "auth_group_permissions" (
	"id"	integer NOT NULL,
	"group_id"	integer NOT NULL,
	"permission_id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("group_id") REFERENCES "auth_group"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("permission_id") REFERENCES "auth_permission"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "auth_user_groups" (
	"id"	integer NOT NULL,
	"user_id"	integer NOT NULL,
	"group_id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("group_id") REFERENCES "auth_group"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("user_id") REFERENCES "auth_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "auth_user_user_permissions" (
	"id"	integer NOT NULL,
	"user_id"	integer NOT NULL,
	"permission_id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("permission_id") REFERENCES "auth_permission"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("user_id") REFERENCES "auth_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "django_admin_log" (
	"id"	integer NOT NULL,
	"object_id"	text,
	"object_repr"	varchar(200) NOT NULL,
	"action_flag"	smallint unsigned NOT NULL CHECK("action_flag" >= 0),
	"change_message"	text NOT NULL,
	"content_type_id"	integer,
	"user_id"	integer NOT NULL,
	"action_time"	datetime NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("content_type_id") REFERENCES "django_content_type"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("user_id") REFERENCES "auth_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "django_content_type" (
	"id"	integer NOT NULL,
	"app_label"	varchar(100) NOT NULL,
	"model"	varchar(100) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "auth_permission" (
	"id"	integer NOT NULL,
	"content_type_id"	integer NOT NULL,
	"codename"	varchar(100) NOT NULL,
	"name"	varchar(255) NOT NULL,
	FOREIGN KEY("content_type_id") REFERENCES "django_content_type"("id") DEFERRABLE INITIALLY DEFERRED,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "auth_group" (
	"id"	integer NOT NULL,
	"name"	varchar(150) NOT NULL UNIQUE,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "auth_user" (
	"id"	integer NOT NULL,
	"password"	varchar(128) NOT NULL,
	"last_login"	datetime,
	"is_superuser"	bool NOT NULL,
	"username"	varchar(150) NOT NULL UNIQUE,
	"last_name"	varchar(150) NOT NULL,
	"email"	varchar(254) NOT NULL,
	"is_staff"	bool NOT NULL,
	"is_active"	bool NOT NULL,
	"date_joined"	datetime NOT NULL,
	"first_name"	varchar(150) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "myapp_punto_carnaval" (
	"id"	integer NOT NULL,
	"coord_lat"	real NOT NULL,
	"coord_lng"	real NOT NULL,
	"titulo"	varchar(255) NOT NULL,
	"direccion"	varchar(255) NOT NULL,
	"imagen_ruta"	varchar(255) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "myapp_puntos_recorrido" (
	"id"	integer NOT NULL,
	"latitud_rc"	real NOT NULL,
	"longitud_rc"	real NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "django_session" (
	"session_key"	varchar(40) NOT NULL,
	"session_data"	text NOT NULL,
	"expire_date"	datetime NOT NULL,
	PRIMARY KEY("session_key")
);
CREATE TABLE IF NOT EXISTS "myapp_punto_planifica" (
	"id"	integer NOT NULL,
	"coord_lat"	real NOT NULL,
	"coord_lng"	real NOT NULL,
	"titulo"	varchar(255) NOT NULL,
	"name"	varchar(255) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "myapp_punto_conoce" (
	"id"	integer NOT NULL,
	"coord_lat"	real NOT NULL,
	"coord_lng"	real NOT NULL,
	"titulo"	varchar(255) NOT NULL,
	"name"	varchar(255) NOT NULL,
	"descripcion"	varchar(255) NOT NULL,
	"imagen_ruta"	varchar(255) NOT NULL,
	"detalles"	varchar(255) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "myapp_punto_custom" (
	"id"	integer NOT NULL,
	"coord_lat"	real NOT NULL,
	"coord_lng"	real NOT NULL,
	"name"	varchar(255) NOT NULL,
	"descripcion"	varchar(255) NOT NULL,
	"user_id"	integer NOT NULL,
	FOREIGN KEY("user_id") REFERENCES "auth_user"("id") DEFERRABLE INITIALLY DEFERRED,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "django_migrations" VALUES (1,'contenttypes','0001_initial','2024-06-08 04:04:40.585529');
INSERT INTO "django_migrations" VALUES (2,'auth','0001_initial','2024-06-08 04:04:40.598522');
INSERT INTO "django_migrations" VALUES (3,'admin','0001_initial','2024-06-08 04:04:40.606532');
INSERT INTO "django_migrations" VALUES (4,'admin','0002_logentry_remove_auto_add','2024-06-08 04:04:40.616529');
INSERT INTO "django_migrations" VALUES (5,'admin','0003_logentry_add_action_flag_choices','2024-06-08 04:04:40.622522');
INSERT INTO "django_migrations" VALUES (6,'contenttypes','0002_remove_content_type_name','2024-06-08 04:04:40.634515');
INSERT INTO "django_migrations" VALUES (7,'auth','0002_alter_permission_name_max_length','2024-06-08 04:04:40.645522');
INSERT INTO "django_migrations" VALUES (8,'auth','0003_alter_user_email_max_length','2024-06-08 04:04:40.653529');
INSERT INTO "django_migrations" VALUES (9,'auth','0004_alter_user_username_opts','2024-06-08 04:04:40.719521');
INSERT INTO "django_migrations" VALUES (10,'auth','0005_alter_user_last_login_null','2024-06-08 04:04:40.729528');
INSERT INTO "django_migrations" VALUES (11,'auth','0006_require_contenttypes_0002','2024-06-08 04:04:40.732522');
INSERT INTO "django_migrations" VALUES (12,'auth','0007_alter_validators_add_error_messages','2024-06-08 04:04:40.739521');
INSERT INTO "django_migrations" VALUES (13,'auth','0008_alter_user_username_max_length','2024-06-08 04:04:40.747528');
INSERT INTO "django_migrations" VALUES (14,'auth','0009_alter_user_last_name_max_length','2024-06-08 04:04:40.755522');
INSERT INTO "django_migrations" VALUES (15,'auth','0010_alter_group_name_max_length','2024-06-08 04:04:40.764528');
INSERT INTO "django_migrations" VALUES (16,'auth','0011_update_proxy_permissions','2024-06-08 04:04:40.769528');
INSERT INTO "django_migrations" VALUES (17,'auth','0012_alter_user_first_name_max_length','2024-06-08 04:04:40.778529');
INSERT INTO "django_migrations" VALUES (18,'myapp','0001_initial','2024-06-08 04:04:40.863528');
INSERT INTO "django_migrations" VALUES (19,'sessions','0001_initial','2024-06-08 04:04:40.870522');
INSERT INTO "django_migrations" VALUES (20,'myapp','0002_punto_planifica','2024-06-09 01:13:59.919095');
INSERT INTO "django_migrations" VALUES (21,'myapp','0003_punto_conoce','2024-06-09 03:43:36.461176');
INSERT INTO "django_migrations" VALUES (22,'myapp','0004_punto_conoce_detalles','2024-06-09 03:57:06.985960');
INSERT INTO "django_migrations" VALUES (23,'myapp','0005_punto_personal','2024-06-14 00:46:33.058004');
INSERT INTO "django_migrations" VALUES (24,'myapp','0006_punto_custom_delete_punto_personal','2024-06-14 00:50:04.630522');
INSERT INTO "django_admin_log" VALUES (144,'1','punto_custom object (1)',1,'[{"added": {}}]',12,3,'2024-06-14 00:57:13.130467');
INSERT INTO "django_admin_log" VALUES (145,'2','punto_custom object (2)',1,'[{"added": {}}]',12,3,'2024-06-14 00:57:47.482550');
INSERT INTO "django_content_type" VALUES (1,'admin','logentry');
INSERT INTO "django_content_type" VALUES (2,'auth','permission');
INSERT INTO "django_content_type" VALUES (3,'auth','group');
INSERT INTO "django_content_type" VALUES (4,'auth','user');
INSERT INTO "django_content_type" VALUES (5,'contenttypes','contenttype');
INSERT INTO "django_content_type" VALUES (6,'sessions','session');
INSERT INTO "django_content_type" VALUES (7,'myapp','punto_carnaval');
INSERT INTO "django_content_type" VALUES (8,'myapp','puntos_recorrido');
INSERT INTO "django_content_type" VALUES (9,'myapp','punto_planifica');
INSERT INTO "django_content_type" VALUES (10,'myapp','punto_conoce');
INSERT INTO "django_content_type" VALUES (11,'myapp','punto_personal');
INSERT INTO "django_content_type" VALUES (12,'myapp','punto_custom');
INSERT INTO "auth_permission" VALUES (1,1,'add_logentry','Can add log entry');
INSERT INTO "auth_permission" VALUES (2,1,'change_logentry','Can change log entry');
INSERT INTO "auth_permission" VALUES (3,1,'delete_logentry','Can delete log entry');
INSERT INTO "auth_permission" VALUES (4,1,'view_logentry','Can view log entry');
INSERT INTO "auth_permission" VALUES (5,2,'add_permission','Can add permission');
INSERT INTO "auth_permission" VALUES (6,2,'change_permission','Can change permission');
INSERT INTO "auth_permission" VALUES (7,2,'delete_permission','Can delete permission');
INSERT INTO "auth_permission" VALUES (8,2,'view_permission','Can view permission');
INSERT INTO "auth_permission" VALUES (9,3,'add_group','Can add group');
INSERT INTO "auth_permission" VALUES (10,3,'change_group','Can change group');
INSERT INTO "auth_permission" VALUES (11,3,'delete_group','Can delete group');
INSERT INTO "auth_permission" VALUES (12,3,'view_group','Can view group');
INSERT INTO "auth_permission" VALUES (13,4,'add_user','Can add user');
INSERT INTO "auth_permission" VALUES (14,4,'change_user','Can change user');
INSERT INTO "auth_permission" VALUES (15,4,'delete_user','Can delete user');
INSERT INTO "auth_permission" VALUES (16,4,'view_user','Can view user');
INSERT INTO "auth_permission" VALUES (17,5,'add_contenttype','Can add content type');
INSERT INTO "auth_permission" VALUES (18,5,'change_contenttype','Can change content type');
INSERT INTO "auth_permission" VALUES (19,5,'delete_contenttype','Can delete content type');
INSERT INTO "auth_permission" VALUES (20,5,'view_contenttype','Can view content type');
INSERT INTO "auth_permission" VALUES (21,6,'add_session','Can add session');
INSERT INTO "auth_permission" VALUES (22,6,'change_session','Can change session');
INSERT INTO "auth_permission" VALUES (23,6,'delete_session','Can delete session');
INSERT INTO "auth_permission" VALUES (24,6,'view_session','Can view session');
INSERT INTO "auth_permission" VALUES (25,7,'add_punto_carnaval','Can add punto_carnaval');
INSERT INTO "auth_permission" VALUES (26,7,'change_punto_carnaval','Can change punto_carnaval');
INSERT INTO "auth_permission" VALUES (27,7,'delete_punto_carnaval','Can delete punto_carnaval');
INSERT INTO "auth_permission" VALUES (28,7,'view_punto_carnaval','Can view punto_carnaval');
INSERT INTO "auth_permission" VALUES (29,8,'add_puntos_recorrido','Can add puntos_recorrido');
INSERT INTO "auth_permission" VALUES (30,8,'change_puntos_recorrido','Can change puntos_recorrido');
INSERT INTO "auth_permission" VALUES (31,8,'delete_puntos_recorrido','Can delete puntos_recorrido');
INSERT INTO "auth_permission" VALUES (32,8,'view_puntos_recorrido','Can view puntos_recorrido');
INSERT INTO "auth_permission" VALUES (33,9,'add_punto_planifica','Can add punto_planifica');
INSERT INTO "auth_permission" VALUES (34,9,'change_punto_planifica','Can change punto_planifica');
INSERT INTO "auth_permission" VALUES (35,9,'delete_punto_planifica','Can delete punto_planifica');
INSERT INTO "auth_permission" VALUES (36,9,'view_punto_planifica','Can view punto_planifica');
INSERT INTO "auth_permission" VALUES (37,10,'add_punto_conoce','Can add punto_conoce');
INSERT INTO "auth_permission" VALUES (38,10,'change_punto_conoce','Can change punto_conoce');
INSERT INTO "auth_permission" VALUES (39,10,'delete_punto_conoce','Can delete punto_conoce');
INSERT INTO "auth_permission" VALUES (40,10,'view_punto_conoce','Can view punto_conoce');
INSERT INTO "auth_permission" VALUES (41,11,'add_punto_personal','Can add punto_personal');
INSERT INTO "auth_permission" VALUES (42,11,'change_punto_personal','Can change punto_personal');
INSERT INTO "auth_permission" VALUES (43,11,'delete_punto_personal','Can delete punto_personal');
INSERT INTO "auth_permission" VALUES (44,11,'view_punto_personal','Can view punto_personal');
INSERT INTO "auth_permission" VALUES (45,12,'add_punto_custom','Can add punto_custom');
INSERT INTO "auth_permission" VALUES (46,12,'change_punto_custom','Can change punto_custom');
INSERT INTO "auth_permission" VALUES (47,12,'delete_punto_custom','Can delete punto_custom');
INSERT INTO "auth_permission" VALUES (48,12,'view_punto_custom','Can view punto_custom');
INSERT INTO "auth_user" VALUES (3,'pbkdf2_sha256$600000$JJDBu3SamJpVXGWTlCBAPx$lzIZ6eufSxo/1k/RdiF5ZRbWDoGk8jhssEgeb6dAZwI=','2024-06-14 02:44:37.939528',1,'admin','','admin@gmial.com',1,1,'2024-06-09 22:25:19.083127','');
INSERT INTO "auth_user" VALUES (4,'pbkdf2_sha256$600000$QaV0g6hFAb3qiRp0zeAaVy$HcDkYti/UgJtEBr7UBRj2ggvUhgZmfsrMQCXdjPp/eA=','2024-06-14 02:47:14.188182',0,'alv','','',0,1,'2024-06-09 22:32:48.530058','Alvaro Villalobos');
INSERT INTO "auth_user" VALUES (5,'pbkdf2_sha256$600000$SM8tZNmyI07KIA7aaLV93J$hDWnoEEfOgHitP5Fqcz+iNkgNaUppRLnSBaOh4xFrSE=',NULL,0,'mari','','',0,1,'2024-06-09 23:21:58.704036','Maria Guiterrez');
INSERT INTO "auth_user" VALUES (6,'pbkdf2_sha256$600000$ozSVH3heQAvSxfZy4jQmqw$CYjSutMHQgq2mz73j0p9QuiagFqMY80SzSsvcTTh9Os=','2024-06-14 02:43:28.579338',0,'juan','','',0,1,'2024-06-09 23:22:10.787024','Juan Carlos');
INSERT INTO "auth_user" VALUES (8,'pbkdf2_sha256$600000$4R0wdH0dNi4nRIDVO5tPsH$c5pJgNdxolrGf8TlHyR6rq71NMouWsNDH+bVENjPnbU=',NULL,0,'manu','','',0,1,'2024-06-10 00:39:42.883308','Manuel Vargas');
INSERT INTO "auth_user" VALUES (9,'pbkdf2_sha256$600000$tfMRl6L99lzjWJQHeJ9hyz$knxpLIfBYtFe/YCajSmmSK0wA9bjw2JnSaMET0tgFlk=',NULL,0,'sofi','','',0,1,'2024-06-10 00:39:56.368255','Sofia Carranza');
INSERT INTO "auth_user" VALUES (10,'pbkdf2_sha256$600000$yNNHACm4SD7JrgI9RauJaw$Sp43DOTdJEb1vAZTUbIRi8YEOcqYMnPHPfaWP9rqozE=',NULL,0,'ali','','',0,1,'2024-06-10 00:40:07.702280','Alina Suarez');
INSERT INTO "auth_user" VALUES (11,'pbkdf2_sha256$600000$9fUCrPnUSME2wJwqf20HcR$R0QHGermS+tfpOtZ9gVcEVp5t+zb7atLh9ql0asZRFU=',NULL,0,'pere','','',0,1,'2024-06-10 00:40:17.324056','Sofia Perez');
INSERT INTO "auth_user" VALUES (12,'pbkdf2_sha256$600000$FHKq0SRvHLaaLkn7On8Ftv$bZ9a8j4VnwErA/BzShPWKC+oMMWOe97wkzYyzDywijU=',NULL,0,'tulo','','',0,1,'2024-06-10 00:40:27.918524','Tulio trivino');
INSERT INTO "auth_user" VALUES (13,'pbkdf2_sha256$600000$0DHNi46IOVLJgJ4Ec1Z5rZ$nXLbYrsajwLdAm+GduYzUXP4dmQBZlgVeO/ITQyS5FI=',NULL,0,'car','','',0,1,'2024-06-10 00:40:36.182476','Carlos Bodoque');
INSERT INTO "myapp_punto_carnaval" VALUES (1,-17.9567332821248,-67.10514358752,'Puesto de Salud','Sector Avenida Heroes del Chaco','static/img/mapa/salud/salud1.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (2,-17.9602406460098,-67.1067215760926,'Puesto de Salud','Avenida Villaroel y Velasco Galvarro','static/img/mapa/salud/salud7.png');
INSERT INTO "myapp_punto_carnaval" VALUES (3,-17.961972664665,-67.107116061632,'Puesto de Salud','Velasco Galvarro entre Aroma y Rodriguez','static/img/mapa/salud/salud3.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (4,-17.9649961858182,-67.1079725196422,'Puesto de Salud','Velasco Galvarro entre Herrera y 1ro de noviembre','static/img/mapa/salud/salud2.jpeg');
INSERT INTO "myapp_punto_carnaval" VALUES (5,-17.9675206251004,-67.1064287136832,'Puesto de Salud','Rajka Bakovic entre Caro y Montecinos','static/img/mapa/salud/salud4.jfif');
INSERT INTO "myapp_punto_carnaval" VALUES (6,-17.9673506967721,-67.1090570216887,'Puesto de Salud','Caro entre Pagador y Velasco Galvarro','static/img/mapa/salud/salud10.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (7,-17.9683094963734,-67.1083425360373,'Puesto de Salud','Cochabamba ente Velasco Galvarro y Av. 6 de agosto','static/img/mapa/salud/salud9.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (8,-17.9710016111835,-67.1078986609015,'Puesto de Salud','Adolfo Mier entre Av. 6 de agosto y rajka Bakovic','static/img/mapa/salud/salud8.jpeg');
INSERT INTO "myapp_punto_carnaval" VALUES (9,-17.9718511529808,-67.1108459445685,'Puesto de Salud','Adolfo Mier entre Av. 6 de agosto y Rajka Bakovic','static/img/mapa/salud/salud7.png');
INSERT INTO "myapp_punto_carnaval" VALUES (10,-17.9704797529679,-67.1105269714272,'Puesto de Salud','Pagador y Adolfo Mier','static/img/mapa/salud/salud6.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (11,-17.9710639597009,-67.1143417299085,'Puesto de Salud','Pagador y Adolfo Mier','static/img/mapa/salud/salud5.png');
INSERT INTO "myapp_punto_carnaval" VALUES (12,-17.9688313177913,-67.1149128086621,'Puesto de Salud','Presidente Montes entre Junin y Adolfo Mier','static/img/mapa/salud/salud4.jfif');
INSERT INTO "myapp_punto_carnaval" VALUES (13,-17.9679592737634,-67.1155758681922,'Puesto de Salud','Junin y Washington','static/img/mapa/salud/salud3.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (14,-17.969046738341,-67.1167086365171,'Puesto de Salud','Camacho entre Bolivar y Adolfo Mier','static/img/mapa/salud/salud2.jpeg');
INSERT INTO "myapp_punto_carnaval" VALUES (15,-17.9683711724501,-67.117457035271,'Puesto de Salud','Petot y Adolfo Mier','static/img/mapa/salud/salud10.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (16,-17.9705755587728,-67.1183904491622,'Puesto de Salud','Petot entre Murguia y Sucre','static/img/mapa/salud/salud9.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (17,-17.9683915711636,-67.1185728300327,'Puesto de Salud','Linares entre Bolivar y Adolfo Mier','static/img/mapa/salud/salud5.png');
INSERT INTO "myapp_punto_carnaval" VALUES (18,-17.9609046005435,-67.1046428877634,'Puesto Policial','Avenida Villaroel y Rajka Bakovic','static/img/mapa/policia/policia1.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (19,-17.9699721987594,-67.1060842175341,'Puesto Policial','Avenida Brasil esquina Ayacucho','static/img/mapa/policia/policia2.png');
INSERT INTO "myapp_punto_carnaval" VALUES (20,-17.9700428280665,-67.1092510875697,'Puesto Policial','Junin esquina Velasco Galvarro','static/img/mapa/policia/policia3.png');
INSERT INTO "myapp_punto_carnaval" VALUES (21,-17.9695773032638,-67.115621588736,'Puesto Policial','Bolivar entre Washington y Presidente Montes','static/img/mapa/policia/policia4.png');
INSERT INTO "myapp_punto_carnaval" VALUES (22,-17.9581622224537,-67.1038387261566,'Deposito residual','Rajka Bakovic altura Maestranza de trenes','static/img/mapa/deposito1.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (23,-17.9618716385561,-67.1048553073566,'Deposito residual','Rajka Bakovic y Aroma B','static/img/mapa/deposito2.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (24,-17.9629396984382,-67.1073891753568,'Deposito residual','Velasco Galvarro entre Ignacion Leon y Rodriguez','static/img/mapa/deposito1.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (25,-17.9643893591844,-67.1055738637482,'Deposito residual','Rajka Bakovic entre 1ro de noviembre e Ignacio Leon','static/img/mapa/deposito2.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (26,-17.966234141182,-67.1060842187109,'Deposito residual','Rajka Bakovic entre Montecinos y Herrera','static/img/mapa/deposito1.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (27,-17.9669016440812,-67.1085721966325,'Deposito residual','Velasco Galvarro entre Caro y Montecinos','static/img/mapa/deposito2.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (28,-17.9698508177595,-67.1097587540343,'Deposito residual','Junin entre Pagador y Velasco Galvarro','static/img/mapa/deposito1.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (29,-17.9725186479396,-67.1078603899395,'Deposito residual','Rajka Bakovic entre Sucre y Bolivar','static/img/mapa/deposito2.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (30,-17.9722031057694,-67.1106928399545,'Deposito residual','Sucre y Pagador','static/img/mapa/deposito1.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (31,-17.9693648748719,-67.1112285688214,'Deposito residual','Junin y Potosi','static/img/mapa/deposito2.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (32,-17.971282410997,-67.1133848236466,'Deposito residual','Sucre entre Soria Galvarro y 6 de octubre','static/img/mapa/deposito1.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (33,-17.9684279813639,-67.1141279069417,'Deposito residual','Junin entre Presidente Montes y La Plata','static/img/mapa/deposito2.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (34,-17.9707932562046,-67.1156252858139,'Deposito residual','Sucre y Presidente Montes','static/img/mapa/deposito1.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (35,-17.9679057719181,-67.1164649264747,'Deposito residual','Junin y Camacho','static/img/mapa/deposito2.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (36,-17.9701407716198,-67.1176022005686,'Deposito residual','Sucre entre Petot y Camacho','static/img/mapa/deposito1.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (37,-17.9691978057474,-67.1196564527833,'Deposito residual','Baptista entre Sucre y Bolivar','static/img/mapa/deposito2.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (38,-17.9602679415636,-67.1056662977937,'Paso Peatonal','Avenida Villarroel','static/img/mapa/paso1.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (39,-17.9614386358899,-67.1059780989869,'Paso Peatonal','Calle Aroma A','static/img/mapa/paso2.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (40,-17.9623249057049,-67.1062453665307,'Paso Peatonal','Calle Rodriguez','static/img/mapa/paso1.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (41,-17.9636382474076,-67.1066187520789,'Paso Peatonal','Calle Jose Ignacio Leon','static/img/mapa/paso2.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (42,-17.9646927735984,-67.1069262983213,'Paso Peatonal','Calle 1ro de Noviembre','static/img/mapa/paso1.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (43,-17.9676014142417,-67.107748519253,'Paso Peatonal','Calle Caro','static/img/mapa/paso2.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (44,-17.9693129078642,-67.1082190034771,'Paso Peatonal','Calle Ayacucho','static/img/mapa/paso1.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (45,-17.9701454253403,-67.1084950376559,'Paso Peatonal','Calle Junin','static/img/mapa/paso2.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (46,-17.9715497122024,-67.1088971503323,'Paso Peatonal','Calle Bolivar','static/img/mapa/paso1.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (47,-17.9707616419328,-67.1119113090838,'Paso Peatonal','Calle Potosi','static/img/mapa/paso2.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (48,-17.9706007456488,-67.1127185622055,'Paso Peatonal','Calle 6 de Octubre','static/img/mapa/paso1.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (49,-17.9702913618726,-67.1136857889786,'Paso Peatonal','Calle Soria Galvarro','static/img/mapa/paso2.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (50,-17.9692902013459,-67.1142570361247,'Paso Peatonal','Adolfo Mier y La Plata','static/img/mapa/paso1.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (51,-17.9690388835394,-67.1150324907725,'Paso Peatonal','Adolfo Mier y Presidente Montes','static/img/mapa/paso2.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (52,-17.9690063133566,-67.1179350384616,'Paso Peatonal','Calle Petot','static/img/mapa/paso1.jpg');
INSERT INTO "myapp_punto_carnaval" VALUES (53,-17.9671017963628,-67.1178681017945,'Paso Peatonal','Calle Junin','static/img/mapa/paso2.jpg');
INSERT INTO "myapp_puntos_recorrido" VALUES (1,-17.9576988580973,-67.1047964550766);
INSERT INTO "myapp_puntos_recorrido" VALUES (2,-17.9646966889236,-67.1068702216212);
INSERT INTO "myapp_puntos_recorrido" VALUES (3,-17.9689792960851,-67.1080579417801);
INSERT INTO "myapp_puntos_recorrido" VALUES (4,-17.9716609344575,-67.1088268299442);
INSERT INTO "myapp_puntos_recorrido" VALUES (5,-17.9701040382825,-67.114451575242);
INSERT INTO "myapp_puntos_recorrido" VALUES (6,-17.9693223276215,-67.1142003343028);
INSERT INTO "myapp_puntos_recorrido" VALUES (7,-17.9690705524613,-67.1149949844003);
INSERT INTO "myapp_puntos_recorrido" VALUES (8,-17.9699337237225,-67.1152671167343);
INSERT INTO "myapp_puntos_recorrido" VALUES (9,-17.9690996216427,-67.1178613769119);
INSERT INTO "myapp_puntos_recorrido" VALUES (10,-17.9682547228201,-67.1175735136206);
INSERT INTO "myapp_puntos_recorrido" VALUES (11,-17.968051125085,-67.1180623890813);
INSERT INTO "myapp_puntos_recorrido" VALUES (12,-17.9671732839204,-67.1178157728072);
INSERT INTO "myapp_puntos_recorrido" VALUES (13,-17.9670938382334,-67.1180826636185);
INSERT INTO "myapp_puntos_recorrido" VALUES (14,-17.9671094213553,-67.1182701430459);
INSERT INTO "myapp_puntos_recorrido" VALUES (15,-17.9674693904705,-67.1185555269912);
INSERT INTO "django_session" VALUES ('86a2h2zgwqfh6l3fyu6iljzie9hzf2nb','.eJxVjDsOwjAQBe_iGlnrX2JT0nMGa9de4wBypDipEHeHSCmgfTPzXiLitta4dV7ilMVZKHH63QjTg9sO8h3bbZZpbusykdwVedAur3Pm5-Vw_w4q9vqtE6gByDkPygQbDLNLZMOosx80Kle0CbkY8tpTSCMDFWuUBWssIHgl3h-5iDal:1sGQvG:Nr94841Hdf-MmB-EBOa6JkXtJlHcnT5EB0kUT-OPLoU','2024-06-23 22:21:58.842408');
INSERT INTO "django_session" VALUES ('b1bt154660c34ns5v5tjuut0qvncd0bm','.eJxVjMsOgjAUBf-la9PgbWnBpXu-obkvLGpoQmFl_HclYaHbMzPnZRJua05b1SVNYi7Gm9PvRsgPnXcgd5xvxXKZ12Uiuyv2oNUORfR5Pdy_g4w1f-uGGLoA7PtA1LOHVpRdJ-qiwiis0TNFpwogQASIbUM6ajgjREEx7w8J1zly:1sHwyA:emKHCDm22o7Eq0h7JK_fKF1it8N9WYefItwETZ6PfXk','2024-06-28 02:47:14.191188');
INSERT INTO "myapp_punto_planifica" VALUES (1,-17.9655744573287,-67.1063554686954,'Hotel','Hostal Graciela');
INSERT INTO "myapp_punto_planifica" VALUES (2,-17.9623614709278,-67.1027831840402,'Hotel','Hotel Glorioso');
INSERT INTO "myapp_punto_planifica" VALUES (3,-17.9622453885046,-67.1066114877467,'Hotel','Gran Hotel Bolivia');
INSERT INTO "myapp_punto_planifica" VALUES (4,-17.9691289609589,-67.1143311895997,'Hotel','Hotel Plaza');
INSERT INTO "myapp_punto_planifica" VALUES (5,-17.9664352435099,-67.115116428847,'Hotel','Hotel Briggs');
INSERT INTO "myapp_punto_planifica" VALUES (6,-17.9669998379344,-67.1179714663233,'Hotel','Hotel Virgen del Socavon');
INSERT INTO "myapp_punto_planifica" VALUES (7,-17.9696794953687,-67.1146830054631,'Hotel','Solárium Restaurante Hotel Edén');
INSERT INTO "myapp_punto_planifica" VALUES (8,-17.9706661421507,-67.1128791202891,'Hotel','Hotel Houston');
INSERT INTO "myapp_punto_planifica" VALUES (9,-17.9613315532021,-67.1081258337808,'Hotel','Residencial Hinojosa');
INSERT INTO "myapp_punto_planifica" VALUES (10,-17.9707924963966,-67.1128899895997,'Hotel','Hotel Sucre Palace');
INSERT INTO "myapp_punto_planifica" VALUES (11,-17.9710297289956,-67.1104012552037,'Hotel','Gran Hotel Galaxia');
INSERT INTO "myapp_punto_planifica" VALUES (12,-17.9679620993552,-67.1072722803334,'Hotel','Hotel Monarca');
INSERT INTO "myapp_punto_planifica" VALUES (13,-17.9703163449054,-67.1137786761082,'Comida','Restaurante El Negrito');
INSERT INTO "myapp_punto_planifica" VALUES (14,-17.9687093011755,-67.1146098116486,'Comida','La Casona');
INSERT INTO "myapp_punto_planifica" VALUES (15,-17.9735904147243,-67.1109544668418,'Comida','Restaurant Nayjama');
INSERT INTO "myapp_punto_planifica" VALUES (16,-17.9704054530578,-67.1131857576824,'Comida','Factory Xpress');
INSERT INTO "myapp_punto_planifica" VALUES (17,-17.9699609956287,-67.1101239877464,'Comida','Restaurant Pagador');
INSERT INTO "myapp_punto_planifica" VALUES (18,-17.9717646331081,-67.1116718073163,'Comida','Restaurant Vegetariano Govinda');
INSERT INTO "myapp_punto_planifica" VALUES (19,-17.9691899334391,67.1167096454187,'Comida','Bravo''s Pizza');
INSERT INTO "myapp_punto_planifica" VALUES (20,-17.9512627800815,-67.1087646404877,'Comida','Charquekan Orureño "El Puente"');
INSERT INTO "myapp_punto_planifica" VALUES (21,-17.9655051486836,-67.105275720808,'Comida','Churrasqueria Santa Brasa');
INSERT INTO "myapp_punto_planifica" VALUES (22,-17.964040814872,-67.1004704774341,'Comida','Dori pollo Oruro');
INSERT INTO "myapp_punto_planifica" VALUES (23,17.9649439060173,-67.1102488990873,'Comida','Super hamburguesas Oruro');
INSERT INTO "myapp_punto_planifica" VALUES (24,-17.9621506210534,-67.1038248693219,'Comida','Restaurant El Fogón');
INSERT INTO "myapp_punto_planifica" VALUES (25,-17.9636258664936,-67.1115775705486,'Comida','Rancheria Oruro');
INSERT INTO "myapp_punto_planifica" VALUES (26,-17.981218340992,-67.1225093696081,'Turismo','Museo Nacional Antropológico Eduardo López Rivas');
INSERT INTO "myapp_punto_planifica" VALUES (27,-17.9675380605926,-67.1123490626169,'Turismo','Museo Simón I. Patiño');
INSERT INTO "myapp_punto_planifica" VALUES (28,-17.9671719853455,-67.1188695075022,'Turismo','Museo Sacro del Santuario del Socavón');
INSERT INTO "myapp_punto_planifica" VALUES (29,-17.9905660573536,-67.1370627472714,'Turismo','Museo Mineralógico');
INSERT INTO "myapp_punto_planifica" VALUES (30,-17.9715441649106,-67.1017033147293,'Turismo','Casa Arte Taller Cardozo Velasquez Oruro');
INSERT INTO "myapp_punto_planifica" VALUES (31,-17.9642368614142,-67.112514718436,'Turismo','Museo Diocesano San Miguel Oruro');
INSERT INTO "myapp_punto_planifica" VALUES (32,-17.9744038517608,-67.1205183472719,'Turismo','Estación Superior Teleférico Turístico');
INSERT INTO "myapp_punto_planifica" VALUES (33,-17.9809646492042,-67.1227022184356,'Turismo','Museo Arqueológico');
INSERT INTO "myapp_punto_planifica" VALUES (34,-17.9767144461722,-67.1398674626166,'Turismo','Esculturas Plaza Chiripujio');
INSERT INTO "myapp_punto_planifica" VALUES (36,-17.95648488,-67.09457506,'Comida','comerrrrr');
INSERT INTO "myapp_punto_conoce" VALUES (2,-17.9655744573287,-67.1063554686954,'Hotel','Hostal Graciela','Disfrute de una estancia tranquila y acogedora en el Hostal Graciela, donde la hospitalidad y el confort se combinan para brindarle una experiencia inolvidable. Con habitaciones cómodas y servicios excepcionales.','/static/img/conoceoruro/hot.png','Habitacion simple - 154 Bs.<br>Habitacion suite - 214 Bs.');
INSERT INTO "myapp_punto_conoce" VALUES (3,-17.9623614709278,-67.1027831840402,'Hotel','Hotel Glorioso','Sumérjase en la elegancia y el encanto del Hotel Glorioso, donde el lujo se combina con la comodidad para crear un ambiente verdaderamente excepcional. Desde nuestras lujosas habitaciones hasta nuestras instalaciones de primera clase.','/static/img/conoceoruro/hot.png','Rango de precios (por dia):<br>Habitacion estandar - 204 Bs.<br>Habitacion suite - 346 Bs.<br>Habitacion Familiar - 691 Bs.');
INSERT INTO "myapp_punto_conoce" VALUES (4,-17.9622453885046,-67.1066114877467,'Hotel','Gran Hotel Bolivia','Descubra el verdadero significado de la hospitalidad boliviana en el Gran Hotel Bolivia, donde la tradición se encuentra con la modernidad para ofrecerle una experiencia única en su clase. Con una ubicación céntrica y servicios de clase mundial, nuestro h','/static/img/conoceoruro/hot.png','Rango de precios (por dia):<br>Habitacion simple - 194 Bs.<br>Habitacion Luxury - 454 Bs.');
INSERT INTO "myapp_punto_conoce" VALUES (5,-17.9691289609589,-67.1143311895997,'Hotel','Hotel Plaza','Experimente el lujo y la comodidad en el Hotel Plaza, donde cada detalle está cuidadosamente diseñado para ofrecerle una estancia inolvidable. Desde nuestras elegantes habitaciones hasta nuestras instalaciones de primera clase, nuestro hotel es el refugio','/static/img/conoceoruro/hot.png','Rango de precios (por dia):<br>Habitacion simple - 314 Bs.<br>Habitacion suite - 714 Bs.');
INSERT INTO "myapp_punto_conoce" VALUES (6,-17.9664352435099,-67.115116428847,'Hotel','Hotel Briggs','Sumérjase en la sofisticación y el estilo en el Hotel Briggs, donde la elegancia se encuentra con la comodidad para brindarle una experiencia verdaderamente excepcional. Con una ubicación privilegiada y servicios de primera clase, nuestro hotel es el dest','/static/img/conoceoruro/hot.png','Rango de precios (por dia):<br>Habitacion simple - 148 Bs.<br>Habitacion suite - 254 Bs.');
INSERT INTO "myapp_punto_conoce" VALUES (7,-17.9669998379344,-67.1179714663233,'Hotel','Hotel Virgen del Socavon','Descubra la belleza y la serenidad en el Hotel Virgen del Socavon, donde la tradición se encuentra con la modernidad para ofrecerle una experiencia única en su clase. Con una ubicación privilegiada y servicios excepcionales, nuestro hotel es el refugio pe','/static/img/conoceoruro/hot.png','Rango de precios (por dia):<br>Habitacion individual - 221 Bs.<br>Habitacion doble - 311 Bs.<br>Habitacion suite - 415 Bs.');
INSERT INTO "myapp_punto_conoce" VALUES (8,-17.9696794953687,-67.1146830054631,'Hotel','Solárium Restaurante Hotel Edén','Experimente la tranquilidad y el confort en el Solárium Restaurante Hotel Edén, donde la naturaleza y la hospitalidad se combinan para brindarle una estancia verdaderamente rejuvenecedora. Con vistas impresionantes y servicios excepcionales, nuestro hotel','/static/img/conoceoruro/hot.png','Rango de precios (por dia):<br>Habitacion simple - 271 Bs.<br>Habitacion suite - 551 Bs.');
INSERT INTO "myapp_punto_conoce" VALUES (9,-17.9706661421507,-67.1128791202891,'Hotel','Hotel Houston','Descanse y relájese en el Hotel Houston, donde la comodidad y la conveniencia se encuentran para brindarle una experiencia de alojamiento inigualable. Con habitaciones espaciosas y servicios excepcionales, nuestro hotel es el refugio perfecto para viajero','/static/img/conoceoruro/hot.png','Rango de precios (por dia):<br>Habitacion simple - 174 Bs.<br>Habitacion suite - 251 Bs.');
INSERT INTO "myapp_punto_conoce" VALUES (10,-17.9613315532021,-67.1081258337808,'Hotel','Residencial Hinojosa','Sumérjase en la historia y el encanto de la Residencial Hinojosa, donde la tradición se encuentra con la modernidad para ofrecerle una experiencia de alojamiento única. Con una ubicación céntrica y servicios excepcionales, nuestro hotel es el destino perf','/static/img/conoceoruro/hot.png','Rango de precios (por dia):<br>Habitacion simple - 124 Bs.<br>Habitacion suite - 201 Bs.');
INSERT INTO "myapp_punto_conoce" VALUES (11,-17.9707924963966,-67.1128899895997,'Hotel','Hotel Sucre Palace','Descubra el lujo y la elegancia en el Hotel Sucre Palace, donde el estilo y la sofisticación se combinan para brindarle una experiencia de alojamiento excepcional. Con habitaciones lujosas y servicios de primera clase, nuestro hotel es el refugio perfecto','/static/img/conoceoruro/hot.png','Rango de precios (por dia):<br>Habitacion simple - 301 Bs.<br>Habitacion Deluxe - 611 Bs');
INSERT INTO "myapp_punto_conoce" VALUES (12,-17.9710297289956,-67.1104012552037,'Hotel','Gran Hotel Galaxia','Sumérjase en el lujo y la comodidad en el Gran Hotel Galaxia, donde cada detalle está cuidadosamente diseñado para ofrecerle una experiencia de alojamiento inolvidable. Desde nuestras elegantes habitaciones hasta nuestras instalaciones de clase mundial, n','/static/img/conoceoruro/hot.png','Rango de precios (por dia):<br>Habitacion simple - 271 Bs.<br>Habitacion suite - 551 Bs.');
INSERT INTO "myapp_punto_conoce" VALUES (13,-17.9679620993552,-67.1072722803334,'Hotel','Hotel Monarca','Experimente la elegancia y el encanto en el Hotel Monarca, donde la comodidad se encuentra con la sofisticación para brindarle una experiencia de alojamiento excepcional. Con una ubicación privilegiada y servicios de primera clase, nuestro hotel es el ref','/static/img/conoceoruro/hot.png','Rango de precios (por dia):<br>Habitacion simple - 219 Bs.<br>Habitacion suite - 414 Bs.');
INSERT INTO "myapp_punto_conoce" VALUES (14,-17.9703163449054,-67.1137786761082,'Comida','Restaurante El Negrito','Restaurante El Negrito','/static/img/conoceoruro/resta.png','Sirve: Comida peruana, Comida rápida, Desayuno, Almuerzo, Cenas.<br><br>Rango de precios: 20 Bs. - 55 Bs.');
INSERT INTO "myapp_punto_conoce" VALUES (15,-17.9687093011755,-67.1146098116486,'Comida','La Casona','La Casona','/static/img/conoceoruro/resta.png','Sirve: Variedad de Pizzas, similares, opcion vegetariana.<br><br>Rango de precios: 27 Bs. - 60 Bs.');
INSERT INTO "myapp_punto_conoce" VALUES (16,-17.9735904147243,-67.1109544668418,'Comida','Restaurant Nayjama','Restaurant Nayjama','/static/img/conoceoruro/resta.png','Sirve: Almuerzo, Cenas, comida tipica, tradicional de la region, platos especiales.<br><br>Rango de precios: 20 Bs. - 55 Bs.');
INSERT INTO "myapp_punto_conoce" VALUES (17,-17.9704054530578,-67.1131857576824,'Comida','Factory Xpress','Factory Xpress','/static/img/conoceoruro/resta.png','Sirve: Comida rápida, hamburguesas, alitas de pollo, platos especiales, cortes de carne.<br><br>Rango de precios: 41 Bs. - 70 Bs.');
INSERT INTO "myapp_punto_conoce" VALUES (18,-17.9699609956287,-67.1101239877464,'Comida','Restaurant Pagador','Restaurant Pagador','/static/img/conoceoruro/resta.png','Sirve: Almuerzo, Cenas, almuerzo completo familiar, platos extras.<br><br>Rango de precios: 15 Bs. - 25 Bs.');
INSERT INTO "myapp_punto_conoce" VALUES (19,-17.9717646331081,-67.1116718073163,'Comida','Restaurant Vegetariano Govinda','Restaurant Vegetariano Govinda','/static/img/conoceoruro/resta.png','Sirve: Almuerzo, comida vegetariana, platos extras.<br><br>Rango de precios: 14 Bs. - 20 Bs.');
INSERT INTO "myapp_punto_conoce" VALUES (20,-17.9691899334391,-67.1167096454187,'Comida','Bravo''s Pizza','Bravo''s Pizza','/static/img/conoceoruro/resta.png','Sirve: Comida rápida, pizzas, similares.<br><br>Rango de precios: 31 Bs. - 90 Bs.');
INSERT INTO "myapp_punto_conoce" VALUES (21,-17.9512627800815,-67.1087646404877,'Comida','Charquekan Orureño ''El Puente''','Charquekan Orureño ''El Puente''','/static/img/conoceoruro/resta.png','Sirve: Almuerzo, Comida tradicional de la region, Charquekan.<br><br>Rango de precios: 40 Bs. - 70 Bs.');
INSERT INTO "myapp_punto_conoce" VALUES (22,-17.9655051486836,-67.105275720808,'Comida','Churrasqueria Santa Brasa','Churrasqueria Santa Brasa','/static/img/conoceoruro/resta.png','Sirve: Almuerzo, platos de la region, platillos especiales, parrilla.<br><br>Rango de precios: 31 Bs. - 60 Bs.');
INSERT INTO "myapp_punto_conoce" VALUES (23,-17.964040814872,-67.1004704774341,'Comida','Dori pollo Oruro','Dori pollo Oruro','/static/img/conoceoruro/resta.png','Sirve: Comida rápida, Cenas, Pollo frito.<br><br>Rango de precios: 12 Bs. - 28 Bs.');
INSERT INTO "myapp_punto_conoce" VALUES (24,-17.9649439060173,-67.1102488990873,'Comida','Super hamburguesas Oruro','Super hamburguesas Oruro','/static/img/conoceoruro/resta.png','Sirve: Comida rápida, Cenas, Hamburguesas, Pollo frito, Tortas.<br><br>Rango de precios: 20 Bs. - 78 Bs.');
INSERT INTO "myapp_punto_conoce" VALUES (25,-17.9621506210534,-67.1038248693219,'Comida','Restaurant El Fogón','Restaurant El Fogón','/static/img/conoceoruro/resta.png','Sirve: Almuerzo, Cenas, Comida Tradicional, Platillos tipicos.<br><br>Rango de precios: 25 Bs. - 60 Bs.');
INSERT INTO "myapp_punto_conoce" VALUES (26,-17.9636258664936,-67.1115775705486,'Comida','Rancheria Oruro','Rancheria Oruro','/static/img/conoceoruro/resta.png','Sirve: Comida rápida tradicional, Opciones variadas.<br><br>Rango de precios: 5 Bs. - 15 Bs.');
INSERT INTO "myapp_punto_conoce" VALUES (27,-17.981218340992,-67.1225093696081,'Museo','Museo Nacional Antropológico Eduardo López Rivas','Sumérjase en la fascinante historia y cultura de Bolivia en el Museo Nacional Antropológico Eduardo López Rivas. Con una impresionante colección de artefactos antiguos y exhibiciones interactivas, este museo ofrece una visión única de la rica herencia cul','/static/img/conoceoruro/mm.png','Desde las civilizaciones precolombinas hasta la época colonial, cada sala de exposición cuenta una historia cautivadora que seguramente dejará una impresión duradera en sus visitantes.');
INSERT INTO "myapp_punto_conoce" VALUES (28,-17.9675380605926,-67.1123490626169,'Museo','Museo Simón I. Patiño','Descubra el legado de una de las familias más influyentes de Bolivia en el Museo Simón I. Patiño. Ubicado en una mansión histórica, este museo ofrece una mirada íntima a la vida y los logros de Simón I. Patiño, un destacado empresario y filántropo del sig','/static/img/conoceoruro/mm.png','Con exhibiciones meticulosamente curadas y artefactos originales, los visitantes pueden explorar la fascinante historia de esta figura icónica y su impacto en el país.');
INSERT INTO "myapp_punto_conoce" VALUES (29,-17.9671719853455,-67.1188695075022,'Museo','Museo Sacro del Santuario del Socavón','Sumérjase en la espiritualidad y el arte sacro en el Museo Sacro del Santuario del Socavón. Situado en el corazón de Oruro, este museo alberga una impresionante colección de arte religioso y objetos litúrgicos relacionados con la devoción al Virgen del So','/static/img/conoceoruro/mm.png','Desde pinturas vívidas hasta esculturas intrincadas, cada pieza cuenta una historia de fe y devoción que resuena profundamente con los visitantes.');
INSERT INTO "myapp_punto_conoce" VALUES (30,-17.9905660573536,-67.1370627472714,'Museo','Museo Mineralógico','Explore el fascinante mundo de los minerales y las gemas en el Museo Mineralógico. Con una amplia colección de especímenes únicos y raros, este museo ofrece una visión única de la geología y la mineralogía de Bolivia.','/static/img/conoceoruro/mm.png','Desde cristales brillantes hasta piedras preciosas exquisitamente talladas, cada exhibición revela la belleza y la diversidad de la tierra.');
INSERT INTO "myapp_punto_conoce" VALUES (31,-17.9715441649106,-67.1017033147293,'Museo','Casa Arte Taller Cardozo Velasquez Oruro','Sumérjase en el vibrante mundo del arte boliviano en la Casa Arte Taller Cardozo Velasquez Oruro. Con obras de artistas locales y regionales, este espacio cultural ofrece una experiencia única de inmersión en la escena artística de la región.','/static/img/conoceoruro/mm.png','Desde pinturas contemporáneas hasta esculturas innovadoras, cada obra de arte refleja la rica diversidad cultural y la creatividad de Bolivia.');
INSERT INTO "myapp_punto_conoce" VALUES (32,-17.9642368614142,-67.112514718436,'Museo','Museo Diocesano San Miguel Oruro','Descubra la historia y la herencia religiosa de Oruro en el Museo Diocesano San Miguel. Situado en el corazón del centro histórico, este museo alberga una impresionante colección de arte sacro y objetos litúrgicos que datan de la época colonial hasta la a','/static/img/conoceoruro/mm.png','Desde pinturas renacentistas hasta ornamentos litúrgicos elaboradamente decorados, cada pieza cuenta una historia única de fe y devoción.');
INSERT INTO "myapp_punto_conoce" VALUES (33,-17.9744038517608,-67.1205183472719,'Museo','Estación Superior Teleférico Turístico','Disfrute de una vista panorámica incomparable de Oruro desde la Estación Superior Teleférico Turístico. Suba a bordo de las góndolas y disfrute de un emocionante paseo aéreo sobre la ciudad, mientras admira las impresionantes vistas de los paisajes circun','/static/img/conoceoruro/mm.png','Con cómodas instalaciones y acceso conveniente a las principales atracciones turísticas, esta estación es el punto de partida perfecto para explorar todo lo que Oruro tiene para ofrecer.');
INSERT INTO "myapp_punto_conoce" VALUES (34,-17.9809646492042,-67.1227022184356,'Museo','Museo Arqueológico','Sumérjase en el pasado ancestral de Bolivia en el Museo Arqueológico. Con una impresionante colección de artefactos precolombinos y restos arqueológicos, este museo ofrece una visión fascinante de las civilizaciones antiguas que una vez poblaron la región','/static/img/conoceoruro/mm.png','Desde cerámicas antiguas hasta herramientas de piedra, cada exhibición revela los misterios y maravillas de la historia antigua de Bolivia.');
INSERT INTO "myapp_punto_conoce" VALUES (35,-17.9767144461722,-67.1398674626166,'Museo','Esculturas Plaza Chiripujio','Descubra la belleza y el arte en la Plaza Chiripujio, donde una colección única de esculturas adorna el paisaje urbano. Desde obras abstractas hasta representaciones figurativas, cada escultura es una expresión única de la creatividad humana y una celebra','/static/img/conoceoruro/mm.png','Sumérjase en este oasis de belleza y tranquilidad, y déjese inspirar por la creatividad de los artistas locales.');
INSERT INTO "myapp_punto_conoce" VALUES (36,-17.9674105417191,-67.1188467087253,'Iglesia','Iglesia del Virgen del Socavón','Sumérjase en la belleza y la espiritualidad de la Iglesia del Virgen del Socavón. Con una arquitectura impresionante y una rica historia de devoción, esta iglesia es un lugar sagrado para los fieles y un punto de referencia icónico en la ciudad de Oruro.','/static/img/conoceoruro/i.png','Desde sus majestuosos altares hasta sus impresionantes vitrales, cada detalle de esta iglesia cuenta una historia de fe y devoción que ha perdurado a lo largo de los siglos.');
INSERT INTO "myapp_punto_conoce" VALUES (37,-17.9671894773864,-67.1144337914531,'Iglesia','Parroquia Santo Domingo','Descubra la serenidad y la tranquilidad en la Parroquia Santo Domingo. Con una arquitectura encantadora y un ambiente acogedor, esta iglesia es un refugio espiritual en el corazón de la ciudad.','/static/img/conoceoruro/i.png','Desde sus hermosas vidrieras hasta su altar decorado, cada rincón de esta parroquia invita a la reflexión y la contemplación.');
INSERT INTO "myapp_punto_conoce" VALUES (38,-17.9603189408718,-67.1100461030914,'Iglesia','Iglesia de San Gerardo','Explore la historia y la herencia religiosa de Oruro en la Iglesia de San Gerardo. Con una arquitectura impresionante y una rica tradición de devoción, esta iglesia es un símbolo de la fe católica en la región.','/static/img/conoceoruro/i.png','Desde sus imponentes torres hasta su interior bellamente decorado, cada detalle de esta iglesia inspira asombro y reverencia en aquellos que la visitan.');
INSERT INTO "myapp_punto_conoce" VALUES (39,-17.9704482526502,-67.1030149184552,'Iglesia','Parroquia Jesús Obrero','Sumérjase en la espiritualidad y el arte sacro en la Parroquia Jesús Obrero. Con una arquitectura moderna y una rica tradición de devoción, esta iglesia es un lugar de encuentro para los fieles y un centro de vida comunitaria en la ciudad.','/static/img/conoceoruro/i.png','Desde sus impresionantes esculturas hasta sus hermosos murales, cada obra de arte en esta parroquia cuenta una historia de fe y redención que resuena profundamente con los visitantes.');
INSERT INTO "myapp_punto_conoce" VALUES (40,-17.9692863084193,-67.1134836992319,'Iglesia','Catedral Nuestra Señora de la Asunción','Explore la grandeza y la majestuosidad de la Catedral Nuestra Señora de la Asunción. Con una arquitectura impresionante y una rica historia de devoción, esta catedral es un símbolo de la fe católica en Bolivia.','/static/img/conoceoruro/i.png','Desde sus imponentes columnas hasta sus intrincados detalles decorativos, cada aspecto de esta catedral inspira asombro y admiración en aquellos que la visitan.');
INSERT INTO "myapp_punto_conoce" VALUES (42,-17.96011827,-67.12247372,'Comida','comerrrrr','comss','/static/img/conoceoruro/resta.png','casa');
INSERT INTO "myapp_punto_custom" VALUES (1,-17.9690833740186,-67.1146944914439,'Plaza','Una plaza bonita',4);
INSERT INTO "myapp_punto_custom" VALUES (2,-17.9705938832068,-67.1104458003441,'Mercado','El mercado mas cercano',4);
INSERT INTO "myapp_punto_custom" VALUES (3,-17.96751487,-67.10869789,'aa','aa',6);
INSERT INTO "myapp_punto_custom" VALUES (4,-17.95245005,-67.11848259,'bb','bbbbb',6);
INSERT INTO "myapp_punto_custom" VALUES (5,-17.95245005,-67.11848259,'bb','bbbbb',6);
INSERT INTO "myapp_punto_custom" VALUES (13,-17.96380746,-67.11101532,'nue','nuyeee',3);
CREATE UNIQUE INDEX IF NOT EXISTS "auth_group_permissions_group_id_permission_id_0cd325b0_uniq" ON "auth_group_permissions" (
	"group_id",
	"permission_id"
);
CREATE INDEX IF NOT EXISTS "auth_group_permissions_group_id_b120cbf9" ON "auth_group_permissions" (
	"group_id"
);
CREATE INDEX IF NOT EXISTS "auth_group_permissions_permission_id_84c5c92e" ON "auth_group_permissions" (
	"permission_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "auth_user_groups_user_id_group_id_94350c0c_uniq" ON "auth_user_groups" (
	"user_id",
	"group_id"
);
CREATE INDEX IF NOT EXISTS "auth_user_groups_user_id_6a12ed8b" ON "auth_user_groups" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "auth_user_groups_group_id_97559544" ON "auth_user_groups" (
	"group_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "auth_user_user_permissions_user_id_permission_id_14a6b632_uniq" ON "auth_user_user_permissions" (
	"user_id",
	"permission_id"
);
CREATE INDEX IF NOT EXISTS "auth_user_user_permissions_user_id_a95ead1b" ON "auth_user_user_permissions" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "auth_user_user_permissions_permission_id_1fbb5f2c" ON "auth_user_user_permissions" (
	"permission_id"
);
CREATE INDEX IF NOT EXISTS "django_admin_log_content_type_id_c4bce8eb" ON "django_admin_log" (
	"content_type_id"
);
CREATE INDEX IF NOT EXISTS "django_admin_log_user_id_c564eba6" ON "django_admin_log" (
	"user_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "django_content_type_app_label_model_76bd3d3b_uniq" ON "django_content_type" (
	"app_label",
	"model"
);
CREATE UNIQUE INDEX IF NOT EXISTS "auth_permission_content_type_id_codename_01ab375a_uniq" ON "auth_permission" (
	"content_type_id",
	"codename"
);
CREATE INDEX IF NOT EXISTS "auth_permission_content_type_id_2f476e4b" ON "auth_permission" (
	"content_type_id"
);
CREATE INDEX IF NOT EXISTS "django_session_expire_date_a5c62663" ON "django_session" (
	"expire_date"
);
CREATE INDEX IF NOT EXISTS "myapp_punto_custom_user_id_b6d49bc0" ON "myapp_punto_custom" (
	"user_id"
);
COMMIT;

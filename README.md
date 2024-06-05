# food-delivery-diplom-project
### Instalācijas instrukcija tīmekļa lietotnei
Lai sekmīgi palaistu izstrādāto tīmekļa lietotni, kas sastāv no backend (Express) un 
frontend (React) daļām, izpildiet sekojošās darbības:
## 1. Repozitorija Lejupielāde
1. Lejupielādējiet tīmekļa lietotnes repozitoriju un saglabājiet to tādā direktorijā, kas ir 
viegli atrodama, piemēram, C:/<lejupielādētā repozitorija nosaukums>. Lejupielādējiet 
repozitoriju šeit: https://github.com/Tavrus43/food-delivery-diplom-project.git
## 2. Node.js un npm Instalēšana
1. Lejupielādējiet un uzinstalējiet Node.js un npm no oficiālās mājas lapas: Node.js 
Lejupielāde.
## 3. Backend (Express) Instalācija
1. Atveriet komandu rindas logu (Command Prompt) vai termināli.
2. Izmantojot cd komandu, pārejiet uz lejupielādēto repozitoriju, piemēram: cd 
C:/<lejupielādētā repozitorija nosaukums>/backend.
3. Instalējiet visas nepieciešamās atkarības, izmantojot npm: npm install.
## 4. Nodrošiniet, ka MongoDB serveris darbojas, un konfigurējiet .env failu ar 
nepieciešamajiem iestatījumiem, kurus var dabūt ar šiem saitēm.
MongoDB: The Developer Data Platform | MongoDB, 
JwtSecret.com - Generate JWT Secrets Online,
Image and Video Upload, Storage, Optimization and CDN (cloudinary.com),
Stripe | Financial Infrastructure to Grow Your Revenue
2
5. Izveidojiet noklusējuma administratora lietotāju ar komandu :
6. Sāciet serveri:
## 4. Frontend (React) Instalācija
1. Atveriet jaunu komandu rindas logu (Command Prompt) vai termināli.
2. Izmantojot cd komandu, pārejiet uz lejupielādēto repozitoriju, piemēram: cd 
C:/<lejupielādētā repozitorija nosaukums>/frontend.
3. Instalējiet visas nepieciešamās atkarības, izmantojot npm: npm install.
4. Sāciet React izstrādes serveri:
## Tīmekļa Lietotnes Piekļuve
Kad abi serveri ir palaisti, tīmekļa lietotne būs pieejama šādās adresēs:
Backend serveris: http://localhost:5000
Frontend serveris: http://localhost:3000
## Piezīme
Sistēma ir aizpildīta ar nelielu daudzumu datu, lai tā saglabātu uzskatāmu izskatu. Ir izveidots 
viens noklusējuma superlietotājs:
Ielogošanās dati ((lietotājvārds: admin | parole: adminpassword).
## Testa Datu Aizpildīšana
Lai aizpildītu sistēmu ar testa datiem, varat palaist failu populateTestData.js:
node populateTestData.js

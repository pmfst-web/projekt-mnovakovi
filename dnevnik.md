# Evidencija aktivnosti

## 06.03.2023.
Pocetak | Kraj
------- | ----
14:45   | 18:45
### Kratki opis promjena
Početak rada na frontendu: stvorena react aplikacije, definirane komponente App, Objava, NovaObjavaForma, Komentar.
Mogućnost dodavanja/brisanja objava, brisanja komentara (lokalni podaci).

## 08.03.2023.
Pocetak | Kraj
------- | ----
14:55   | 15:30
### Kratki opis promjena
Nastavak rada na frontendu: definirana komponenta Novi komentar.
Mogućnost uređivanja sadržaja objava i komentiranja.

## 09.03.2023.
Pocetak | Kraj
------- | ----
16:00   | 19:10
### Kratki opis promjena
Početak rada na backendu: stvoren express server, definirane osnovne rute (get, post, put, delete) za objave i komentare.
Povezivanje frontenda s backendom, modifikacija postojećih komponenti (lokalni podaci).

## 15.03.2023.
Pocetak | Kraj
------- | ----
13:30   | 17:10
### Kratki opis promjena
Povezivanje s mongoDB: definirane osnovne rute (get, post, put, delete) za objave i komentare.
Middleware za nepoznate rute i druge greške.
Restrukturiranje zahtjeva na frontendu: services folder. 

## 18.03.2023.
Pocetak | Kraj
------- | ----
14:25   | 16:55
### Kratki opis promjena
Mogućnost dodavanja korisnika (trenutno samo putem REST API ekstenzije), enripcija lozinki, modifikacija postojećih ruta za objave i komentare (dvostruko referenciranje).

## 19.03.2023.
Pocetak | Kraj
------- | ----
14:30   | 18:45
### Kratki opis promjena
Autorizacija korisnika: mogućnost prijave, modifikacija ruta (post, put, delete) za objave i komentare (trenutno samo putem REST API ekstenzije).
Definirana komponenta za prijavu korisnika putem forme - LoginForma.

## 22.03.2023.
Pocetak | Kraj
------- | ----
13:25   | 17:55
### Kratki opis promjena
Ideja: Brisanje dokumenata iz kolekcije u bazi ažurira dokumente u drugim kolekcijama po principu dvostrukog referenciranja (npr. ako se u bazu umetne nova objava s pripadajućim ID-jem korisnika, odgovarajuće polje korisnika se ažurira da se u njemu nalazi ID nove objave, isto vrijedi i za brisanje objave - uklanjanje ID-a iz polja korisnika, brisanje svih pripadajućih komentara te objave). Radi kod brisanja i dodavanja objava, ali izbacuje grešku kod brisanja i dodavanja komentara.

## 28.03.2023.
Pocetak | Kraj
------- | ----
16:40   | 20:00
### Kratki opis promjena
Ispravljene greške iz prethodnog zapisa. 
Rad na frontendu: mogućnost prijave korisnika, postavljanja i brisanja objava i komentara, prikaz opcija za brisanje i uređivanje objava ukoliko pripadaju prijavljenom korisniku (problem: gumbovi vidljivi tek nakon ponovne prijave korisnika i/ili ponovnog učitavanja stranice).

## 29.03.2023.
Pocetak | Kraj
------- | ----
18:05   | 19:10
### Kratki opis promjena
Mogućnost registracije korisnika (komponenta RegisterForma) i uređivanja sadržaja objava koje pripadaju korisniku.

## 08.04.2023.
Pocetak | Kraj
------- | ----
17:00   | 19:30
### Kratki opis promjena
Mogućnost (un)likeanja objava.

## 09.04.2023.
Pocetak | Kraj
------- | ----
17:30   | 19:15
### Kratki opis promjena
Mogućnost odabira prikaza svih ili vlastitih objava (komponenta SveObjave).
Dovršena početna struktura aplikacije.

## 23.04.2023.
Pocetak | Kraj
------- | ----
14:00   | 16:55
### Kratki opis promjena
Implementacija Bootstrap okvira: Dorađen izgled formi za prijavu i registraciju.

## 24.04.2023.
Pocetak | Kraj
------- | ----
13:20   | 18:30
### Kratki opis promjena
Dorađen izgled forme za dodavanje novih objava, rad na izgledu objava.

## 25.04.2023.
Pocetak | Kraj
------- | ----
13:15   | 17:40
### Kratki opis promjena
Nastavak rada na izgledu objava.

## 26.04.2023.
Pocetak | Kraj
------- | ----
10:35   | 14:00
### Kratki opis promjena
Nastavak rada na izgledu objava.

## 27.04.2023.
Pocetak | Kraj
------- | ----
14:25   | 19:00
### Kratki opis promjena
Početak rada na backend testovima: definirani testovi za korisnike i objave.

## 28.04.2023.
Pocetak | Kraj
------- | ----
13:25   | 16:00
### Kratki opis promjena
Natavak rada na backend testovima: modificirani testovi za korisnike i objave, definirani testovi za komentare.

## 29.04.2023.
Pocetak | Kraj
------- | ----
17:20   | 20:20
### Kratki opis promjena
Početak rada na frontend testovima: definirani testovi za formu za prijavu, započeti testovi za formu za registraciju.

## 30.04.2023.
Pocetak | Kraj
------- | ----
18:10   | 21:40
### Kratki opis promjena
Nastavak rada na frontend testovima: definirani testovi za formu za registraciju, komponentu Objava i SveObjave.

## 01.05.2023.
Pocetak | Kraj
------- | ----
17:30   | 18:35
### Kratki opis promjena
Dodana komponenta za navigacijsku traku (NavTraka), mogućnost odjave korisnika.
Dovršen prototip aplikacije.


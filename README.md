# Technische-Cases-Educom-Case-2
### Opdracht
Bouw een afzonderlijke ‘backend’ applicatie die periodiek met de API van Buienradar communiceert. De frequentie waarmee jouw applicatie communiceert moet in te stellen zijn in een configuratiebestand. Deze backend haalt de beschikbare gegevens op en slaat deze op in een lokale database. Bestaande gegevens worden indien van toepassing overschreven.  Jouw backend heeft vervolgens ook een API endpoint dat door een frontend (client) applicatie geraadpleegd kan worden. Deze API kent drie parameters:  
- Het betreffende weerstation. 
- De startdatum van de periode die we willen raadplegen. 
- De einddatum van de periode. 
- De einddatum hoeft niet ingevuld te worden, deze is default 7 dagen later dan de startdatum. 

### Oplevering 
Gebruik een programmeeromgeving naar keuze, waar je – voor zover mogelijk - bekend mee bent en waarin je verwacht dit zo goed mogelijk te kunnen ontwikkelen.  Zet de code met instructies hoe te publiceren/bouwen in een (separate) private repository op Github en geef aan de docent/coach van Educom waarvan je de case hebt gekregen toegang.

### Installatie
**1. Clone Repo**
```sh
git clone https://github.com/rutgerfrans/Technische-Cases-Educom-Case-2.git
```

**2. Install dependencies**
```sh
npm install
```

**3. Connect MongoDB**  
Vervang onderstaande connection string met uw eigen connection string en voeg het wachtwoord toe via een .env file of schrijf het mee in de connection string.
Omdat de collectie in het begin leeg zal zijn, raad ik het aan om het interval in de config even aan te passen naar 5000 ms. Zodoende kan er eerder data gepopulate worden. 
```js
mongoose.connect("mongodb+srv://rutger:"+process.env.DB_PASSWORD+"@cluster0.yh4da.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
```

**4. Start Applicatie**
```sh
npm start
```

## Author
[R.F. de Groen](https://rutgerfrans.com/)

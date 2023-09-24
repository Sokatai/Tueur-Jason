"use strict";

let tueur="Jason";
let tueurHp=100;

let survivants=["Michel", "Bernard", "Patrick", "Mohamed", "Jean-Marie"];
let caracteristiques=["sportif", "nerd", "gros baiseur", "voleur", "coopératif"];
let morts=[];

const randomActions = [
    {
        name: "die",
        prob: 0.3
    },
    {
        name: "dodge",
        prob: 0.5
    },
    {
        name: "dmg&die",
        prob: 0.2
    }
];

function caracteristiquesAleatoire(){ //création d'une fonction pour appeler une caractéristique aléatoire parmis celles du tableau caracteristiques
    let nbRandom = Math.floor(Math.random() * 5);
    return caracteristiques[nbRandom];
}

function actionAleatoire(survivant){ //création d'une fonction qui va permettre d'avoir une action aléatoire parmis 3, avec chacune une certaine probabilité de se déclencher
    randomActions.forEach(action => { //on parcourt le tableau randomActions
        if(action.name=="die"){
            // Première option -> la mort
            if(Math.random() < action.prob){
                if (!morts.includes(survivant) && survivants.includes(survivant)) { // Vérifier si le survivant n'est pas déjà mort et qu'il est bien vivant
                    survivants.splice(survivants.indexOf(survivant), 1); //on enlève le survivant du tableau survivant
                    morts.push(survivant); //on met le survivant dans le tableau morts
                    console.log(survivant, " le ", caracteristiquesAleatoire(), " meurt !");
                }
            }
        }
        if(action.name=="dodge"){
            // Deuxième option -> l'ésquive
            if(Math.random() < action.prob){ 
                if(survivants.includes(survivant) && !morts.includes(survivant)) { //Vérifier que le survivant est bien vivant et qu'il n'est pas mort
                    tueurHp-=10; //on inflige 10 points de dégats au tueur donc on enlève 10hp à la variable tueurHp
                    console.log(survivant, " le ", caracteristiquesAleatoire(), " esquive et inflige 10points de dégats à Jason !");
                }
            }
        }
        if(action.name=="dmg&die"){
            // Troisième option
            if(Math.random() < action.prob) {
                if (!morts.includes(survivant) && survivants.includes(survivant)) { // Vérifier si le survivant n'est pas déjà mort et qu'il est bien vivant
                    survivants.splice(survivants.indexOf(survivant), 1); //on enlève le survivant du tableau survivant
                    morts.push(survivant); //on met le survivant dans le tableau morts
                }
                tueurHp-=15; //on inflige 10 points de dégats au tueur donc on enlève 10hp à la variable tueurHp
                console.log(survivant, " le ", caracteristiquesAleatoire(), " inflige 15points de dégats à Jason puis meurt !")
            } 
        }
    });
}

function melangerTableau(array) { //création d'une fonction permettant de mélanger n'importe quel tableau
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}


while(survivants.length>0 && tueurHp>0){ //création de la boucle qui s'execute tant que la longueur du tableau survivants est supérieur a 0 et que le tueur a encore des points de vie
    for(let i=0; i < survivants.length; i++){ //on parcourt le tableau des survivants
        if(survivants.length!=0 || tueurHp >= 0) { //on vérifie qu'il reste des survivants dans le tableau de survivants, et que le tueur ait encore de la vie
            
            melangerTableau(randomActions) //on mélange le tableau randomActions
            actionAleatoire(survivants[i]) //on appelle une action aléatoire pour un survivant
            melangerTableau(survivants); //on mélange le tableau survivants
            
        }
    }
}

if(survivants.length==0 && tueurHp<=0){ //si le tableau survivant est vide ET que le tueur n'a plus de vie, écrire :
    alert("Jason a tué tout le monde, mais lui aussi est mort !");
}else if(survivants.length==0 && tueurHp>0){ //si le tableau survivant est vie ET que le tueur a encore de la vie, écrire :
    alert("Jason a tué tout le monde, il lui reste " + tueurHp + " points de vie !");
}else if(tueurHp<=0 && survivants.length!=0){ //si le tueur n'a plus de vie ET que le tableau n'est pas vide, écrire :
    alert("Les survivants ont gagné, mais RIP à " + morts);
}
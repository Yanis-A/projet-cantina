import { useEffect } from "react";
function About() {
  useEffect(() => {
    document.title = "À propos - Saveurs de Tatooine";
  }, []);
  return (
    <div className="container mb-4">
      <div className="row d-flex flex-column justify-content-center align-items-center">
        <div className="col-10 col-md-9 col-lg-8">
          <h1>À propos de notre Cuisine Interstellaire</h1>
          <strong>
            <em>&quot;Que la Force de la Cuisine soit avec vous.&quot;</em>
          </strong>
          <p>
            Bienvenue dans notre humble coin de la galaxie culinaire où la
            gastronomie interstellaire rencontre l&apos;univers fascinant de
            Star Wars. Ici, sur cette planète virtuelle, nous sommes un groupe
            de voyageurs de l&apos;espace et d&apos;amateurs culinaires
            passionnés, qui ont choisi d&apos;explorer et de célébrer la
            diversité des saveurs de l&apos;univers Star Wars.
          </p>
          <h3>Notre histoire</h3>
          <p>
            Notre mission est simple : partager notre passion pour la cuisine
            inspirée de Star Wars avec des apprentis chefs, des rebelles
            gourmands et des fans de l&apos;univers Star Wars à travers la
            galaxie. Nous croyons fermement que la cuisine est une forme
            d&apos;art et d&apos;expression, tout comme la Force est un élément
            omniprésent dans l&apos;univers de Star Wars.
          </p>
          <p>
            Que vous soyez un chasseur de primes à la recherche de la recette
            parfaite de &quot;Dewback en ragoût&quot; ou un Jedi végétarien
            cherchant des alternatives sans viande, nous avons quelque chose
            pour chaque palais. Chacune de nos recettes est conçue avec amour et
            inspirée par l&apos;univers riche et diversifié de Star Wars.
          </p>
          <h3>Notre équipage</h3>
          <p>
            Rencontrez notre équipage de cuisiniers interstellaires passionnés,
            chacun apportant sa propre expertise culinaire et sa fascination
            pour Star Wars :
          </p>
          <ul>
            <li>
              <strong>Chef Obi-Wok Nem-obi</strong> : Maître Jedi de la cuisine, il est connu
              pour sa sagesse culinaire et sa capacité à transformer les
              ingrédients les plus simples en plats exquis.
            </li>
            <li>
            <strong>Princesse Riz au lait-ia</strong> : Une diplomate de la cuisine avec une
              préférence pour les desserts. Elle sait comment endormir les
              papilles gustatives de l&apos;Empire avec son charme sucré.
            </li>
            <li>
            <strong>Han Soja</strong> : Le contrebandier de la cuisine, il sait comment
              concocter un plat délicieux avec des ingrédients limités.
            </li>
            <li>
            <strong>Maître Iodé</strong> : Le maître des saveurs subtiles, il enseigne la
              patience et l&apos;art de la préparation lente.
            </li>
            <li>
            <strong>Luke Écaille-wok-er</strong> : Un jeune Jedi de la cuisine, il est connu
              pour ses compétences en friture et sa capacité à transformer les
              ingrédients les plus simples en plats exquis.
            </li>
          </ul>
          <h3>Rejoignez-nous dans cette aventure culinaire</h3>
          <p>
            Nous vous invitons à nous rejoindre dans cette aventure culinaire à
            travers la galaxie. Explorez nos recettes, partagez vos créations
            avec la communauté et que la Force de la Cuisine soit avec vous. Que
            vos plats soient toujours dignes d&apos;une ovation digne de la
            Cantina de Mos Eisley !
          </p>
          <p>
            Que votre appétit soit éveillé, que vos papilles soient satisfaites,
            et que chaque bouchée soit une épopée digne des films Star Wars.
            Ensemble, nous voyageons aux confins de la galaxie culinaire,
            explorant des saveurs qui n&apos;ont jamais été imaginées
            auparavant.
          </p>
          <strong>
            <em>
              &quot;La Cuisine est un puissant allié. Puissante est la
              Cuisine.&quot;
            </em>
          </strong>
        </div>
      </div>
    </div>
  );
}
export default About;

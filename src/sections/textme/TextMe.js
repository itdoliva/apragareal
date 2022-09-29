import profilePicture from '../../static/imgs/profile.png';

function TextMe({}) {
  return (
    <section className="sec-text aboutme">

      <h1>SOBRE MIM</h1>
      <div>
          <img src={profilePicture}/>
        <div className="paragraph-wrapper">
          <p>Italo Oliveira é engajado com causas ambientais e de saúde social. Grande admirador dos mares, dos fenômenos climáticos e da dança contemporânea, deseja que o futuro seja possível e justo. Por isso, adotou o veganismo como estilo de vida e se esforça para levá-lo adiante.</p>
          <p>Busca unir sua especialidade em comunicação visual ao desejo de viver transformações sociais e socioeconômicas, pois compreende que mudanças em uma sociedade ocorrem por pressão de um povo informado com fatos.</p>
        </div>
        <div className="pseudo-column" />
      </div>

    </section>
  )
}

export default TextMe;
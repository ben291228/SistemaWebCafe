import styles from './app.module.css'
import Nav from './Components/Nav'


function App() {
  

  return (
    <>
    <body>
      <section>
    <header>
      <div>
        <Nav/>
      </div>
    </header>
      <div className={styles.TextBlock}>
        <span className={styles.subtitle}>Bienvenido</span>
        <div >
          <h1 >Nosotros servimos el mejor cafe de la ciudad!</h1>
        </div>
        <span className={styles.info}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
          Autem numquam laboriosam aperiam eligendi pariatur sequi ducimus</span>
        <button>Ordena ahora</button>
      </div>
      </section>
    </body>
    </>
  )
}

export default App

import styles from './Nav.module.css'

export default function Nav() {
  return (
    <div><nav>
          <span className={styles.title}>coffea</span>
          <ul>
            <li ><a href='App.tsx' >Home</a></li>
            <li><a>Coffe</a></li>
            <li><a>bakery</a></li>
            <li><a>shop</a></li>
            <li><a>about</a></li>
            <li><a>login</a></li>
          </ul>
        </nav>
    </div>
  )
}

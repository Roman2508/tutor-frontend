import { TabMenu } from 'primereact/tabmenu'
import styles from './Header.module.scss'

const Header = () => {
  const items = [
    { label: 'Tutors', icon: 'pi pi-fw pi-home' },
    { label: 'Calendar', icon: 'pi pi-fw pi-calendar' },
    { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
    { label: 'Messages', icon: 'pi pi-fw pi-file' },
    { label: 'Settings', icon: 'pi pi-fw pi-cog' },
  ]

  return (
    <div className={styles.header}>
      <TabMenu model={items} />
    </div>
  )
}

export default Header

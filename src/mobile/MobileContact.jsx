import { socials } from '#constants'

const MobileContact = () => {
  return (
    <div className="mobile-contact">
      <img src="/images/sean.png" alt="Sean" />
      <h2>Let's Connect</h2>
      <p>Got an idea? A bug to squash? Or just wanna talk tech? I'm in.</p>

      <ul>
        {socials.map(({ id, bg, link, icon, text }) => (
          <li key={id} style={{ backgroundColor: bg }}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              <img src={icon} alt="" />
              <span>{text}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MobileContact

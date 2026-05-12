import { ChevronRight } from 'lucide-react'

import { techStack } from '#constants'

const MobileTerminal = () => {
  return (
    <div className="mobile-terminal">
      <p>
        <strong>@sean %</strong> show tech stack
      </p>

      <ul>
        {techStack.map(({ category, items }) => (
          <li key={category}>
            <h2>
              <ChevronRight size={20} />
              {category}
            </h2>
            <div>
              {items.map((item, index) => (
                <p key={item}>
                  - {item}
                  {index < items.length - 1 ? ',' : ''}
                </p>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MobileTerminal

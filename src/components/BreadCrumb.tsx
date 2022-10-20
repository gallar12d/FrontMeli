import ICategory from '../interfaces/ICategory'

interface Props {
  categories: ICategory[]
}

const BreadCrumb = ({ categories }: Props): any => {
  const renderCategories = (): any => {
    return categories.map((cat, index) => {
      if (categories[index + 1] != null) {
        return (
          <li className="itemBreadcrumb" key={index}>
            <a className="breadLink" href="javascript:void(0)">
              <span>{`${cat.name} > `} </span>
            </a>
          </li>
        )
      }
      return (
        <li key={index}>
          <a className="breadLink lastLink" href="javascript:void(0)">
            <span>{`${cat.name} `}</span>
          </a>
        </li>
      )
    })
  }

  return (
    <div className="breadcrumb">
      {(categories.length > 0)
        ? (
        <ul className="ulBreadcrumb">{renderCategories()}</ul>
          )
        : (
            ''
          )}
    </div>
  )
}

export default BreadCrumb

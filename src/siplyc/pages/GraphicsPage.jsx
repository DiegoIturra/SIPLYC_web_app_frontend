import { List } from "../components/List"

export const GraphicsPage = () => {

  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10', 'Item 11', 'Item 12', 'Item 13', 'Item 14', 'Item 15', 'Item 16', 'Item 17', 'Item 18', 'Item 19', 'Item 20', 'Item 21', 'Item 22', 'Item 23', 'Item 24', 'Item 25', 'Item 26', 'Item 27', 'Item 28', 'Item 29', 'Item 30', 'Item 31', 'Item 32', 'Item 33', 'Item 34', 'Item 35', 'Item 36', 'Item 37', 'Item 38', 'Item 39', 'Item 40', 'Item 41', 'Item 42', 'Item 43', 'Item 44', 'Item 45', 'Item 46', 'Item 47', 'Item 48', 'Item 49', 'Item 50', 'Item 51', 'Item 52', 'Item 53', 'Item 54', 'Item 55', 'Item 56', 'Item 57', 'Item 58', 'Item 59', 'Item 60', 'Item 61', 'Item 62', 'Item 63', 'Item 64', 'Item 65', 'Item 66', 'Item 67', 'Item 68', 'Item 69', 'Item 70', 'Item 71', 'Item 72', 'Item 73', 'Item 74', 'Item 75', 'Item 76', 'Item 77', 'Item 78', 'Item 79', 'Item 80', 'Item 81', 'Item 82', 'Item 83', 'Item 84', 'Item 85', 'Item 86', 'Item 87', 'Item 88', 'Item 89', 'Item 90', 'Item 91', 'Item 92', 'Item 93', 'Item 94', 'Item 95', 'Item 96', 'Item 97', 'Item 98', 'Item 99', 'Item 100']

  return (
    <div style={{ backgroundColor: '#00ac96', minHeight: '100vh' }}>
      <h1 className="container pt-4 d-flex justify-content-center align-items-center">Graphics Page</h1>

      <div className="container mt-4 pb-4 d-flex justify-content-center align-items-center">
        <div className="col-7">
          <List items={items}/>
        </div>
      </div>
    </div>
  )
}
import Layout from "@/components/app/layout"
import DataTable from "@/components/app/data-table"
import UserForm from "@/components/app/user-form"

export function App() {
  return (
    <Layout>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <DataTable />
        </div>
        <div className="col-span-1">
          <UserForm />
        </div>
      </div>
    </Layout>
  )
}

export default App

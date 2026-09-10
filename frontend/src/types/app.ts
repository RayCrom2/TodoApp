
export default interface Task {
  id: string
  title: string
  completed: boolean
  created_at: string
  start_at?: string
  end_at: string
}
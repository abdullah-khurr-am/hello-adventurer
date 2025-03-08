import { AdventureBodyProps } from '../App';

function AdventureBody({ adventureHistory, loading }: AdventureBodyProps & { loading: boolean }) {
  return (
    <div className='adventure-body'>
      {adventureHistory.length > 0 && adventureHistory.map((adventure) => {
        return (
        <>
        <div className='text-block'>
          <h4 className='role'>{adventure.role}:</h4>
          <p className='text' style={{whiteSpace: 'pre-wrap'}}>{adventure.content}</p>
          <hr className='divider'/>
        </div>
        </>
        )
  })}
      {loading && <h5>Thinking..</h5>}
    </div>
  )
}

export default AdventureBody;


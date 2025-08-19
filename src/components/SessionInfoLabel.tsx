import { IonLabel } from '@ionic/react';
import { Session } from '../models/Schedule';

interface SessionInfoLabelProps {
  session: Session;
  name? : bool;
  speakers? : bool;
}

const SessionInfoLabel: React.FC<SessionInfoLabelProps> = ({session, name, speakers}) => {
  if (session != null) {
    return (
      <>
        {name && <h3>{session.name}</h3>}
        <p>
          {session.timeStart} &mdash;&nbsp;
          {session.timeEnd}:&nbsp;
          {session.location}
        </p>
        {speakers && session?.speakerNames && session.speakerNames.map((speaker, index) => {
          return (
            <p key={index}>- {speaker}</p>
          )
        })}
      </>
    )
  }
}

export default SessionInfoLabel;

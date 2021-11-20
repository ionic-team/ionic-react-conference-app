// import React, { useEffect, useState } from "react";
// import { Participant } from '../../../data/models/DigitalDocumentsModel';
// import { ParticipantRolesEnum } from '../../../data/models/ESignEnums';
// import './Participants.css';
// import { getProviderInfoFromDb } from '../../../data/api/AdobeESignService';
// import { connect } from 'react-redux';
import React, { useState, useRef } from "react";

import {
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonTitle,
  IonMenuButton,
  IonSegment,
  IonSegmentButton,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonRefresher,
  IonRefresherContent,
  IonToast,
  IonModal,
  IonHeader,
  getConfig,
  IonCard,
  IonItem,
  IonLabel,
  IonCardContent,
  IonCardTitle,
  IonInput,
  IonCardHeader,
} from "@ionic/react";
import { options, pin, search, text } from "ionicons/icons";

// import SessionList from "../components/SessionList";
import SessionListFilter from "../components/SessionListFilter";
import "./UserForm.scss";

import ShareSocialFab from "../components/ShareSocialFab";

import * as selectors from "../data/selectors";
import { connect } from "../data/connect";
import { setSearchText } from "../data/sessions/sessions.actions";
import { Schedule } from "../models/Schedule";

interface OwnProps {}

interface StateProps {
  schedule: Schedule;
  favoritesSchedule: Schedule;
  mode: "ios" | "md";
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
}

type UserFormProps = OwnProps & StateProps & DispatchProps;

const UserForm: React.FC<UserFormProps> = ({
  favoritesSchedule,
  schedule,
  setSearchText,
  mode,
}) => {
  // const { firstName, lastName, email, handleParentParticipantListChange } =
  //   props;
  const [participantRoles, setParticipantRoles] = useState<string[]>([]);
  const [participantList, setParticipantList] = useState([
    {
      providerId: "",
      firstName: "firstName",
      lastName: "lastName",
      email: "email",
      role: "FORM_FILLER",
      order: 1,
    },
  ]);
  const [segment, setSegment] = useState<"all" | "favorites">("all");
  const [showSearchbar, setShowSearchbar] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);

  const pageRef = useRef<HTMLElement>(null);

  const ios = mode === "ios";

  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
    }, 2500);
  };

  //convert the ParticipantRolesEnum to an array to be used when selecting a provider's role
  // const enumToArray = () => {
  // 	const rolesArray = Object.keys(ParticipantRolesEnum)
  // 	setParticipantRoles(rolesArray)
  // }

  //call the enumToArray method on page load only
  // useEffect(() => {
  // 	enumToArray()
  // }, [])

  //this functions handles keyboard input when a user edits the text for the given provider
  const handleParticipantChange = (event: any) => {
    event.preventDefault();
    const fieldToUpdate = event.target.getAttribute("participant-update-field");
    const index: number =
      event.target.parentElement.parentElement.getAttribute(
        "participant-index"
      );
    const copy = participantList;
    let newParticipant;

    //use the participant-update-field (which exists in the input boxes below) to update the array holding all the participant information
    try {
      newParticipant = {
        providerId:
          fieldToUpdate === "providerId"
            ? event.target.value
            : participantList[index].providerId,
        firstName:
          fieldToUpdate === "firstName"
            ? event.target.value
            : participantList[index].firstName,
        lastName:
          fieldToUpdate === "lastName"
            ? event.target.value
            : participantList[index].lastName,
        email:
          fieldToUpdate === "email"
            ? event.target.value
            : participantList[index].email,
        role:
          fieldToUpdate === "role"
            ? event.target.value
            : participantList[index].role,
        order:
          fieldToUpdate === "order"
            ? event.target.value
            : participantList[index].order,
      };

      //make a copy of the participant array, and place the new participant (AKA participant after keyboard edits have been made) into that array. Replace the old participant with the new
      copy[index] = newParticipant;
      setParticipantList([...participantList]);
      // handleParentParticipantListChange([...participantList]);
    } catch (error) {
      console.log(error);
    }
  };

  //use the participant-index attribute and providerId to make a graph query that gets the rest of provider info (full name, email, etc.)
  const getProviderInfo = async (event: any) => {
    event.preventDefault();
    const providerId = event.target.value;
    const index: number =
      event.target.parentElement.parentElement.getAttribute(
        "participant-index"
      );
    const copy = participantList;
    let newParticipant;

    //use the providerId which the user inputted to make a graph query
    // const providerInfo = await getProviderInfoFromDb(providerId)
    try {
      newParticipant = {
        providerId: participantList[index].providerId,
        firstName: "providerInfo.firstName",
        lastName: "providerInfo.lastName",
        email: participantList[index].email,
        role: participantList[index].role,
        order: participantList[index].order,
      };

      //save the results of the graph query to the array holding the participants. Overwrite the previous participant at that index
      copy[index] = newParticipant;
      setParticipantList([...participantList]);
      // handleParentParticipantListChange([...participantList]);
    } catch (error) {
      console.log(error);
      alert(`No provider with id: ${providerId} could be found!`);
    }
  };

  //adds a new, blank participant to a participant array when a user clicks the blue "Add Signer" button
  const addParticipant = () => {
    //create the blank participant
    const newParticipant = {
      providerId: "",
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      order: participantList.length + 1,
    };

    //concatenate the new participant to the participant arry
    setParticipantList(() => participantList.concat([newParticipant]));
  };

  //removes the last participant when a user clicks the red "remove participant" button
  const removeParticipant = () => {
    //set up a new list which is just a copy of the old list
    let copy = participantList;

    //if there is more than one participant, remove the last participant in the array
    if (participantList.length > 1) {
      copy = participantList.slice(0, copy.length - 1);
    } else {
      //if there is only one participant, alert the user and do nothing
      alert("Cannot remove the first participant");
    }

    //send the copy with one less participant to state
    setParticipantList(copy);
    // handleParentParticipantListChange(copy);
  };

  return (
    <>
      <IonPage ref={pageRef} id="schedule-page">
        <IonHeader translucent={true}>
          <IonToolbar>
            {!showSearchbar && (
              <IonButtons slot="start">
                <IonMenuButton />
              </IonButtons>
            )}
            {ios && (
              <IonSegment
                value={segment}
                onIonChange={(e) => setSegment(e.detail.value as any)}
              ></IonSegment>
            )}
            {!ios && !showSearchbar && <IonTitle>Create New Account</IonTitle>}
            {showSearchbar && (
              <IonSearchbar
                showCancelButton="always"
                placeholder="Search"
                onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)}
                onIonCancel={() => setShowSearchbar(false)}
              ></IonSearchbar>
            )}

            <IonButtons slot="end">
              {!ios && !showSearchbar && (
                <IonButton onClick={() => setShowSearchbar(true)}>
                  <IonIcon slot="icon-only" icon={search}></IonIcon>
                </IonButton>
              )}
              {!showSearchbar && (
                <IonButton onClick={() => setShowFilterModal(true)}>
                  {mode === "ios" ? (
                    "Filter"
                  ) : (
                    <IonIcon icon={options} slot="icon-only" />
                  )}
                </IonButton>
              )}
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen={true}>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Create New Account</IonTitle>
            </IonToolbar>
            <IonToolbar>
              <IonSearchbar
                placeholder="Search"
                onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)}
              ></IonSearchbar>
            </IonToolbar>
          </IonHeader>

          <IonRefresher
            slot="fixed"
            ref={ionRefresherRef}
            onIonRefresh={doRefresh}
          >
            <IonRefresherContent />
          </IonRefresher>

          <IonToast
            isOpen={showCompleteToast}
            message="Refresh complete"
            duration={2000}
            onDidDismiss={() => setShowCompleteToast(false)}
          />

          <IonCard>
            {/* <div className="form-style-2"> */}

            {/* <div className="form-style-2-heading"> */}
            <IonCardTitle>
              Enter information about each participant here:
            </IonCardTitle>
            {/* </div> */}
            <form>
              <div id="participantList">
                {participantList.map((participant, index) => (
                  <div
                    key={"signer" + index}
                    participant-index={index}
                    onChange={handleParticipantChange}
                    className="participantDiv"
                  >
                    <h2>
                      <strong>Signer {index + 1}</strong>
                    </h2>

                    <span
                      className="lilMargin required"
                      style={{
                        visibility: index === 0 ? "visible" : "hidden",
                      }}
                    >
                      *Note: signer 1 is you, the person filling out this form
                    </span>
                    <span
                      className="lilMargin required"
                      style={{
                        visibility: index === 1 ? "visible" : "hidden",
                      }}
                    >
                      *Note: signer 2 MUST be the the new hire
                    </span>

                    <label>
                      <span>Provider Id:</span>
                      <input
                        type="text"
                        className="input-field"
                        onChange={handleParticipantChange}
                        participant-providerid={participant.providerId}
                        participant-update-field="providerId"
                        value={participantList[index].providerId}
                      />
                      <IonButton
                        className="lilMargin"
                        onClick={getProviderInfo}
                        // value={participantList[index].providerId}
                      >
                        Search Provider
                      </IonButton>
                    </label>
                    <label>
                      <span>First Name:</span>
                      <input
                        type="text"
                        className="input-field"
                        onChange={handleParticipantChange}
                        participant-first-name={participant.firstName}
                        participant-update-field="firstName"
                        value={participantList[index].firstName}
                      />
                    </label>
                    <label>
                      <span>Last Name:</span>
                      <input
                        type="text"
                        className="input-field"
                        onChange={handleParticipantChange}
                        participant-last-name={participant.lastName}
                        participant-update-field="lastName"
                        value={participantList[index].lastName}
                      />
                    </label>
                    <label>
                      <span>Email:</span>
                      <input
                        type="text"
                        className="input-field"
                        onChange={handleParticipantChange}
                        participant-email={participant.email}
                        participant-update-field="email"
                        value={participantList[index].email}
                      />
                    </label>
                    <label>
                      <span>Role:</span>
                      <select
                        className="input-field"
                        onChange={handleParticipantChange}
                        participant-role={participant.role}
                        role-index={index}
                        participant-update-field="role"
                        value={participantList[index].role}
                      >
                        <option
                          value=""
                          participant-update-field="role"
                        ></option>
                        {participantRoles.map((role: string) => (
                          <option
                            key={role}
                            value={role}
                            participant-update-field="role"
                          >
                            {role}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      <span>Order:</span>
                      <input
                        type="text"
                        className="input-field"
                        onChange={handleParticipantChange}
                        participant-order={index + 1}
                        participant-update-field="order"
                        value={participantList[index].order}
                        readOnly
                      />
                    </label>
                  </div>
                ))}
              </div>
            </form>
            <div className="participantButtons">
              <IonButton onClick={addParticipant}>Add another signer</IonButton>
              <IonButton
                className="remove lilMargin"
                onClick={removeParticipant}
              >
                Remove last signer
              </IonButton>
            </div>
            {/* </div>
            <IonItem>
              {/* <IonIcon icon={pin} slot="start" /> 
              <IonLabel>ion-item in a card, icon left, button right</IonLabel>
               <IonButton fill="outline" slot="end">
                View
              </IonButton> 
            </IonItem> */}

            {/* ############## INFORMATION ABOUT THE USER ############## */}

            <IonCardTitle>Let's get to know you!</IonCardTitle>

            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput value=""></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="floating">First Name</IonLabel>
              <IonInput value=""></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Last Name</IonLabel>
              <IonInput value=""></IonInput>
            </IonItem>

            <IonItem style={{ marginBottom: "20px" }}>
              <IonLabel position="fixed">Date Of Birth</IonLabel>
              <IonInput type="date"></IonInput>
            </IonItem>


            {/* ############## INFORMATION ABOUT THE UNIVERSITY ############## */}

            <IonCardTitle>Tell us about your university:</IonCardTitle>

            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput value=""></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="floating">First Name</IonLabel>
              <IonInput value=""></IonInput>
            </IonItem>

            <IonItem style={{ marginBottom: "20px" }}>
              <IonLabel position="floating">Last Name</IonLabel>
              <IonInput value=""></IonInput>
            </IonItem>

            <IonCardContent>
              This is content, without any paragraph or header tags, within an
              ion-cardContent element.
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
};

// const mapStateToProps = (store: any) => {
// 	return {
// 		userProfile: store.user.userProfile,
// 	}
// }

export default UserForm;

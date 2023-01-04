import { MeetingRole } from "../../interfaces/meeting";

export const getMeetingRole = (roleInRouter: string | undefined) => {
    if (roleInRouter?.toLowerCase() === 'advisor') return MeetingRole.ADVISOR;
    if (roleInRouter?.toLowerCase() === 'co_advisor')
      return MeetingRole.CO_ADVISOR;
    if (roleInRouter?.toLowerCase() === 'mc') return MeetingRole.MC;
    if (roleInRouter?.toLowerCase() === 'studio') return MeetingRole.STUDIO;
    return MeetingRole.CLIENT;
  };
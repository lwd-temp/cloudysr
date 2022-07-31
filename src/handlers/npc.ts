import { GetDialogueEventDataCsReq, GetDialogueEventDataScRsp } from "../../resources/autogenerated/cs.dialogue";
import { GetNpcMessageGroupCsReq, GetNpcMessageGroupScRsp, GetNpcStatusCsReq, GetNpcStatusScRsp } from "../../resources/autogenerated/cs.message";
import { GetFirstTalkNpcCsReq, GetFirstTalkNpcScRsp, NpcMeetStatus } from "../../resources/autogenerated/cs.talkevent";
import { PacketContext, RouteManager } from "../network/route";

export class NpcHandler{
    constructor(routeManager: RouteManager){
        routeManager.on(GetNpcStatusCsReq, this.GetNpcStatusCsReq);
        routeManager.on(GetDialogueEventDataCsReq, this.GetDialogueEventDataCsReq);
        routeManager.on(GetFirstTalkNpcCsReq, this.GetFirstTalkNpcCsReq);
        routeManager.on(GetNpcMessageGroupCsReq, this.GetNpcMessageGroupCsReq);
    }

    public GetNpcMessageGroupCsReq(context: PacketContext<GetNpcMessageGroupCsReq>){
        const rsp = GetNpcMessageGroupScRsp.create();
        rsp.retcode = 0;
        rsp.messageGroupList = [];
        context.send(GetNpcMessageGroupScRsp, rsp);
    }

    public GetFirstTalkNpcCsReq(context: PacketContext<GetFirstTalkNpcCsReq>){
        const rsp = GetFirstTalkNpcScRsp.create();
        rsp.retcode = 0;
        rsp.npcMeetStatusList = context.request.seriesIdList!.map(series_id => {
            return NpcMeetStatus.create({
                seriesId: series_id,
                isMeet: true
            });
        })
        context.send(GetFirstTalkNpcScRsp, rsp);
    }

    public GetDialogueEventDataCsReq(context: PacketContext<GetDialogueEventDataCsReq>){
        const rsp = GetDialogueEventDataScRsp.create();
        rsp.retcode = 0;
        rsp.dialogueEventList = [];
        context.send(GetDialogueEventDataScRsp, rsp);
    }

    public GetNpcStatusCsReq(context: PacketContext<GetNpcStatusCsReq>){
        const rsp = GetNpcStatusScRsp.create();
        rsp.retcode = 0;
        rsp.messageStatusList = [];
        context.send(GetNpcStatusScRsp, rsp);
    }
}
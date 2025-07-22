package com.as.approval_service.grpc;

import approval.CreateApprovalResponse;
import approval.UpdateApprovalResponse;
import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import approval.ApprovalServiceGrpc.ApprovalServiceImplBase;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@GrpcService
public class ApprovalGrpcService extends ApprovalServiceImplBase {

    private final static Logger log = LoggerFactory.getLogger(ApprovalGrpcService.class);

    @Override
    public void createApproval(approval.CreateApprovalRequest approvalRequest,
            StreamObserver<approval.CreateApprovalResponse> responseStreamObserver) {
        log.info("Received create approval request: {}", approvalRequest.toString());

        CreateApprovalResponse response = CreateApprovalResponse.newBuilder()
                .setId("12345") // Simulated response
                .setStatus("APPROVED") // Simulated status
                .build();

        responseStreamObserver.onNext(response);
        responseStreamObserver.onCompleted();
    }

    @Override
    public void updateApproval(approval.UpdateApprovalRequest request,
            StreamObserver<approval.UpdateApprovalResponse> responseObserver) {
        log.info("Received update approval request: {}", request.toString());

        UpdateApprovalResponse response = UpdateApprovalResponse.newBuilder()
                .setId(request.getId())
                .setStatus(request.getStatus())
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}

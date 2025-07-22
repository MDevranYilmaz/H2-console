package com.ProjectHR.grpc;

import approval.ApprovalServiceGrpc;
import approval.CreateApprovalRequest;
import approval.CreateApprovalResponse;
import approval.UpdateApprovalRequest;
import approval.UpdateApprovalResponse;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ApprovalServiceGRPCClient {

    private static final Logger log = LoggerFactory.getLogger(ApprovalServiceGRPCClient.class);
    private final ApprovalServiceGrpc.ApprovalServiceBlockingStub approvalServiceBlockingStub;

    public ApprovalServiceGRPCClient(@Value("${approval.service.address:localhost}") String serverAddress,
            @Value("${approval.service.grpc.port:9090}") int serverPort) {
        log.info("Connecting to Approval Service at {}:{}", serverAddress, serverPort);

        ManagedChannel channel = ManagedChannelBuilder.forAddress(serverAddress, serverPort).usePlaintext().build();

        approvalServiceBlockingStub = ApprovalServiceGrpc.newBlockingStub(channel);
    }

    public CreateApprovalResponse createApprovalResponse(String id, String name, String status, String details) {
        CreateApprovalRequest request = CreateApprovalRequest.newBuilder().setId(id).setName(name).setStatus(status)
                .setDetails(details).build();
        CreateApprovalResponse response = approvalServiceBlockingStub.createApproval(request);
        log.info("Received response from approval grpc service: {}", response);
        return response;
    }

    public UpdateApprovalResponse updateApprovalStatus(String id, String status, String details) {
        UpdateApprovalRequest request = UpdateApprovalRequest.newBuilder()
                .setId(id)
                .setStatus(status)
                .setDetails(details)
                .build();
        UpdateApprovalResponse response = approvalServiceBlockingStub.updateApproval(request);
        log.info("Received update response from approval grpc service: {}", response);
        return response;
    }
}

package com.pth.taskbackend.service;

import com.pth.taskbackend.model.meta.VipCandidate;
import com.pth.taskbackend.model.meta.VipEmployer;
import com.pth.taskbackend.repository.VipEmployerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface VipEmployerService {
    boolean isVip(String employerId);
    public Page<VipEmployer> findByVipId(String vipId, Pageable pageable) throws IOException;
    public Page<VipEmployer>findByEmployerNameContaining(String name,Pageable pageable)throws IOException;
    public List<VipEmployer> findByVipIdWithList(String vipId)throws IOException;
    public Optional<VipEmployer>findById(String id)throws IOException;

    public Optional<VipEmployer>findByIdAndEmployerId(String id,String employerId)throws IOException;

    VipEmployer create(VipEmployer vipEmployer)throws IOException;

    public Optional<VipEmployer> findByEmployerIdAndAvailable(String employerId)throws IOException;

    public Page<VipEmployer> findByEmployerId(String employerId, Pageable pageable)throws IOException;
    public void delete(String employerVipId)throws IOException;

    public float sumPrice()throws IOException;
    Long countValidVipEmployers() throws  IOException;

}

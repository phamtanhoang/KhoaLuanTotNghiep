package com.pth.taskbackend.service;

import com.pth.taskbackend.model.meta.Employer;
import com.pth.taskbackend.model.meta.Vip;
import com.pth.taskbackend.model.meta.VipEmployer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface VipEmployerService {
    boolean isVip(String employerId);
    VipEmployer create(LocalDateTime fromDate, LocalDateTime toDate, Long price, Employer employer, Vip vip,String invoiceId)throws IOException;
    public Page<VipEmployer> findByVipId(String vipId, Pageable pageable) throws IOException;
    public Page<VipEmployer>findByEmployerNameContaining(String keyword,Pageable pageable)throws IOException;
    Page<VipEmployer> findByEmployerId(String employerId,String name, Pageable pageable) throws IOException;
    public List<VipEmployer> findByVipIdWithList(String vipId)throws IOException;
    public Optional<VipEmployer>findById(String id)throws IOException;

    public Optional<VipEmployer>findByIdAndEmployerId(String id,String employerId)throws IOException;



    public Optional<VipEmployer> findByEmployerIdAndAvailable(String employerId)throws IOException;

    public void delete(String employerVipId)throws IOException;

    public float sumPrice()throws IOException;
    Long countValidVipEmployers() throws  IOException;

}

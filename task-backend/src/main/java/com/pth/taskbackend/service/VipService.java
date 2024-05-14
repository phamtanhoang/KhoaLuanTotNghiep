package com.pth.taskbackend.service;

import com.pth.taskbackend.enums.EType;
import com.pth.taskbackend.enums.EVipStatus;
import com.pth.taskbackend.model.meta.Vip;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.util.Optional;

public interface VipService {
    Page<Vip>findByNameContainningAndType(String name, EVipStatus status, Pageable pageable) throws IOException;

    Optional<Vip>findById(String id)  throws IOException;
    Vip create(Vip vip) throws IOException;
    Vip update(Vip vip) throws IOException;

    void deleteById(String id) throws IOException;
}

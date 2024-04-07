package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.model.meta.Collection;
import com.pth.taskbackend.repository.CollectionRepository;
import com.pth.taskbackend.service.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CollectionServiceImpl implements CollectionService {
    @Autowired
    CollectionRepository collectionRepository;
    @Override
    public Collection create(Collection collection) {
        return collectionRepository.save(collection);
    }

    @Override
    public Collection update(Collection collection) {
        return collectionRepository.save(collection);
    }
}

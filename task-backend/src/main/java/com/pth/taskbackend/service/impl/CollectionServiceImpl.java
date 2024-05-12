//package com.pth.taskbackend.service.impl;
//
//import com.pth.taskbackend.repository.CollectionRepository;
//import com.pth.taskbackend.service.CollectionService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.stereotype.Service;
//
//import java.io.IOException;
//import java.util.Optional;
//
//@Service
//public class CollectionServiceImpl implements CollectionService {
//    @Autowired
//    CollectionRepository collectionRepository;
//    @Override
//    public Collection create(Collection collection) {
//        return collectionRepository.save(collection);
//    }
//
//    @Override
//    public Collection update(Collection collection) {
//        return collectionRepository.save(collection);
//    }
//
//    @Override
//    public Optional<Collection> findByIdAndCandidateId(String id, String candidateId) throws IOException {
//        return collectionRepository.findByIdAndCandidateId(id,candidateId);
//    }
//
//    @Override
//    public Page<Collection> findById(String id, Pageable pageable) throws IOException {
//        return collectionRepository.findByCandidateId(id,pageable);
//    }
//}

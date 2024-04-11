package com.pth.taskbackend.service;

import com.pth.taskbackend.model.meta.Collection;
import io.jsonwebtoken.io.IOException;

public interface CollectionService {
    Collection create(Collection collection)throws IOException;
    Collection update(Collection collection)throws IOException;

}

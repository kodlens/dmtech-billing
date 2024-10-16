<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HeaderAndFooterMenuController extends Controller
{
    public function header(): JsonResponse
    {
        return $this->result->success(
            $this->service->getHeaderMenu()
        );
    }

    public function footer(): JsonResponse
    {
        return $this->result->success(
            $this->service->getFooterMenu()
        );
    }

    public function getHeaderAndFooter(): JsonResponse
    {
        return $this->result->success([
            'header' => $this->service->getHeaderMenu(),
            'footer' => $this->service->getFooterMenu(),
        ]);
    }

    
}
